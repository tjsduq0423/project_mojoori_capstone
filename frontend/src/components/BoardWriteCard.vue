<template>
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
              :items="themes"
              label="분야"
              solo
              flat
              outlined
              hide-details="auto"
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
              ref="toastuiEditor"
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
          class="ml-auto mr-6 mb-5 mt-2 blue lighten-1 font-weight-black"
          @click="getHTML"
        >
          작성완료
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/vue-editor";
export default {
  name: "BoardWriteCard",
  components: {
    editor: Editor,
  },
  data() {
    return {
      title: "",
      editorOptions: { hideModeSwitch: true },
      themes: ["종목", "이슈", "유머", "자유"],
    };
  },
  methods: {
    getHTML() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      console.log(html);
    },
  },
};
</script>

<style scoped></style>
