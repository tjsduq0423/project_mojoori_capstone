<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container class="px-0 pt-0">
        <v-row justify="center">
          <v-col
            v-if="
              $vuetify.breakpoint.xl ||
              $vuetify.breakpoint.lg ||
              $vuetify.breakpoint.md
            "
            md="3"
          >
            <BoardBox />
          </v-col>
          <v-col md="8">
            <v-card width="100%" tile elevation="1">
              <v-container>
                <!-- 게시판 글쓰기 -->
                <v-row>
                  <v-col cols="auto" class="mt-6 ml-6 pa-0">
                    <p class="text-h5 text-left font-weight-black">글쓰기</p>
                  </v-col>
                </v-row>

                <!-- 분야 선택  -->
                <v-row>
                  <v-col cols="auto">
                    <v-card width="100px" class="ml-3 mt-1" flat>
                      <v-select
                        v-model="theme"
                        :items="themes"
                        label="분야"
                        solo
                        flat
                        outlined
                        menu-props="auto"
                        hide-details
                      ></v-select>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- 제목 입력 바 -->
                <v-row>
                  <v-col cols="12" class="pt-2">
                    <v-card class="mx-3" flat>
                      <v-text-field
                        v-model="title"
                        solo
                        flat
                        label="제목"
                        hide-details="auto"
                        outlined
                      >
                      </v-text-field>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="ml-3">
                    <v-card flat class="pr-6">
                      <editor
                        v-if="text !== null"
                        ref="toastuiEditor"
                        :initial-value="text"
                        height="500px"
                        initial-edit-type="wysiwyg"
                        preview-style="vertical"
                        :option="editorOptions"
                      />
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-btn
                    dark
                    tile
                    elevation="1"
                    class="
                      ml-auto
                      mr-6
                      mb-5
                      mt-2
                      blue
                      lighten-1
                      font-weight-black
                    "
                    @click="boardModify()"
                  >
                    수정완료
                  </v-btn>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import BoardBox from "@/components/BoardBox.vue";
import "@toast-ui/editor/dist/toastui-editor.css";
import * as boardApi from "@/api/board";
import { mapState } from "vuex";

import { Editor } from "@toast-ui/vue-editor";
export default {
  name: "BoardWriteCard",
  components: {
    Appbar,
    BoardBox,
    editor: Editor,
  },
  data() {
    return {
      title: "",
      theme: "",
      editorOptions: { hideModeSwitch: true },
      themes: ["종목", "이슈", "유머", "자유", "팁과 노하우"],
      text: null,
    };
  },
  computed: {
    ...mapState("auth", ["nickname"]),
  },
  mounted() {
    this.getboard(this.$route.params.id);
  },
  methods: {
    async getboard(Id) {
      try {
        const response = await boardApi.getboard(Id);
        if (response.status === 200) {
          this.theme = response.data.rows[0].board_theme;
          this.title = response.data.rows[0].board_title;
          this.text = response.data.rows[0].board_content;
        }
      } catch (err) {
        if (err.reponse.status === 500) {
          console.log(err.response.data.message); // 상관없음 분기 없는 코드
        }
      }
    },
    async boardModify() {
      const html = this.$refs.toastuiEditor.invoke("getHTML");
      try {
        const response = await boardApi.modify(
          this.title,
          html,
          this.theme,
          this.$route.params.id
        );
        if (response.status === 200) {
          this.$router.push({ path: "/board/home" });
        }
      } catch (err) {
        if (err.response.status === 500) {
          alert("작성 실패");
        }
      }
    },
  },
};
</script>

<style></style>
