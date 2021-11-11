<template>
  <v-card max-width="" min-width="" class="mx-auto" flat>
    <v-container class="px-6">
      <!-- 게시판 제목 -->
      <v-row>
        <v-col cols="auto" class="mt-6 ml-6 pa-0">
          <p class="text-h5 text-left font-weight-black mb-0">댓글</p>
        </v-col>
        <v-col cols="auto" class="mt-8 ml-6 pa-0">
          <p class="text-subtitle-1 mb-0 font-weight-black">
            총 {{ comments.length }} 개
          </p>
        </v-col>
      </v-row>
      <v-row v-if="login" class="grey lighten-1">
        <v-col>
          <v-card class="pa-6">
            <v-row>
              <v-textarea
                v-model="inputText"
                color="teal"
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
                class="teal--text font-weight-bold"
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
                  <v-list-item-title class="text-md-left mt-3"
                    >{{ comment.writer }}
                    <v-list-item-subtitle>
                      {{ comment.lastTime }} 분 전
                    </v-list-item-subtitle>
                    <v-list-item-title class="my-3 pb-3">
                      {{ comment.content }}
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
</template>

<script>
export default {
  name: "CommentCard",
  props: {
    login: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputText: "",
      comments: [
        { content: " 댓글 내용", writer: "작성자 이름", lastTime: "23" },
        { content: " 댓글 내용", writer: "작성자 이름", lastTime: "23" },
        { content: " 댓글 내용", writer: "작성자 이름", lastTime: "23" },
      ],
    };
  },
};
</script>

<style></style>
