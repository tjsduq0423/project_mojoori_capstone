<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container class="px-0 pt-0">
        <v-row justify="center">
          <v-col
            v-if="
              ($vuetify.breakpoint.xl ||
                $vuetify.breakpoint.lg ||
                $vuetify.breakpoint.md) &&
              $store.state.auth.auth
            "
            md="3"
          >
            <BoardBox :style="{ top: '64px', position: 'sticky' }" />
          </v-col>
          <v-col md="8">
            <v-card width="100%" tile elevation="1" class="mb-6">
              <v-container>
                <!-- 게시판 제목 -->
                <v-row>
                  <v-col cols="auto" class="mt-6 ml-9 pa-0">
                    <p class="text-h5 text-left font-weight-black mb-0">
                      {{ title }}
                    </p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="pl-9">
                    <p class="text-subtitle-1 mb-0 text-left">{{ writer }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-divider class="divider mx-3"></v-divider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="ml-6">
                    <viewer
                      v-if="viewerText !== null"
                      height="500px"
                      :initial-value="viewerText"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-divider class="divider mx-3"></v-divider>
                  </v-col>
                </v-row>
                <v-row justify="center" class="py-6">
                  <v-btn
                    outlined
                    x-large
                    color="blue lighten-1"
                    :class="{ 'px-6': true, 'blue lighten-4': likeStatus }"
                    @click="clickLikeButton()"
                  >
                    <v-icon left large color="blue lighten-1" class="px-6">
                      mdi-thumb-up
                    </v-icon>
                    {{ likeCount }}
                  </v-btn>
                </v-row>
              </v-container>
            </v-card>

            <v-card width="100%" class="mx-auto" tile elevation="1">
              <v-container>
                <!-- 게시판 제목 -->
                <v-row>
                  <v-col cols="auto" class="mt-6 ml-6 pa-0">
                    <p class="text-h5 text-left font-weight-black mb-0">댓글</p>
                  </v-col>
                  <v-col cols="auto" class="mt-8 ml-6 pa-0">
                    <p class="text-subtitle-1 mb-0 font-weight-black">
                      총 {{ comments == undefined ? 0 : comments.length }} 개
                    </p>
                  </v-col>
                </v-row>
                <v-row v-if="$store.state.auth.auth" class="blue lighten-3">
                  <v-col>
                    <v-card class="pa-6">
                      <v-row>
                        <v-textarea
                          v-model="inputText"
                          color="blue lighten-3"
                          :counter="80"
                          height="80px"
                          required
                          class="mt-3"
                        >
                        </v-textarea>
                      </v-row>
                      <v-row justify="end">
                        <v-btn
                          text
                          dark
                          height="20px"
                          rounded
                          class="blue lighten-1 font-weight-black"
                          @click="replyWrite()"
                          >작성</v-btn
                        >
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row class="mt-4">
                  <v-col class="pa-0">
                    <v-card flat class="pa-0">
                      <v-list class="py-0">
                        <template v-for="(comment, index) in comments">
                          <v-list-item :key="index">
                            <v-list-item-title class="text-left mt-3"
                              >[ {{ comment.reply_writer }} ]
                              <v-list-item-title class="my-3 pb-3">
                                - {{ comment.reply_content }}
                              </v-list-item-title>
                            </v-list-item-title>
                          </v-list-item>
                          <v-divider
                            v-if="index < comments.length - 1"
                            :key="`${index} - divider`"
                          ></v-divider>
                        </template>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="12" md="8"> </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import BoardBox from "@/components/BoardBox.vue";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { mapState } from "vuex";
import { Viewer } from "@toast-ui/vue-editor";
import * as boardApi from "@/api/board";

export default {
  name: "Article",
  components: {
    Appbar,
    BoardBox,
    viewer: Viewer,
  },
  data() {
    return {
      likeStatus: false,
      comments: null,
      inputText: "",
      title: null,
      writer: null,
      viewerText: null,
      likeCount: null,
    };
  },
  computed: {
    ...mapState("auth", ["nickname"]),
  },
  mounted() {
    this.callContent();
  },
  methods: {
    async clickLikeButton() {
      if (!this.nickname) {
        alert("로그인 해주세요.");
        this.$router.push({ path: "/user-authentication" });
      }
      try {
        const response = await boardApi.like(
          this.$route.params.id,
          this.likeStatus,
          this.nickname
        );
        if (response.status === 200) {
          this.likeCount = this.likeStatus
            ? this.likeCount - 1
            : this.likeCount + 1;
          this.likeStatus = !this.likeStatus;
        }
      } catch (err) {
        if (err.response.status === 500) {
          console.log(err.response.message); // 분기없는 코드
        }
      }
    },
    async callContent() {
      try {
        const response = await boardApi.content(
          this.$route.params.id,
          this.nickname
        );
        if (response.status === 200) {
          this.title = response.data.data.board_title;
          this.writer = response.data.data.board_writer;
          this.viewerText = response.data.data.board_content;
          this.likeStatus = response.data.likeStatus;
          this.comments = response.data.comment;
          this.likeCount = response.data.likeCount;
        }
      } catch (err) {
        if (err.response.status === 404) {
          this.$router.push({ path: "/board/home" });
        }
      }
    },
    async replyWrite() {
      if (this.inputText === "") {
        alert("입력이 필요합니다.");
        return;
      }
      try {
        const response = await boardApi.reply(
          this.$route.params.id,
          this.nickname,
          this.inputText
        );
        if (response.status === 200) {
          this.$router.go(0);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.message); // db 에러잡아내는 코드
        }
      }
    },
  },
};
</script>

<style></style>
