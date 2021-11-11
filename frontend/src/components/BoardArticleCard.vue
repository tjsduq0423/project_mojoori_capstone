<template>
  <v-card max-width="" min-width="" class="mx-auto" flat>
    <v-container class="pa-0">
      <!-- 게시판 제목 -->
      <v-row>
        <v-col cols="auto" class="mt-6 ml-9 pa-0">
          <p class="text-h5 text-left font-weight-black mb-0">게시글 제목</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="ml-9">
          <p class="text-subtitle-1 mb-0 text-left">1 분전 | 작성자 이름</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-divider class="divider mx-3"></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="ml-3">
          <viewer height="500px" :initial-value="viewerText" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-divider class="divider mx-3"></v-divider>
        </v-col>
      </v-row>
      <v-row justify="center" class="py-6">
        <v-col cols="4">
          <v-row justify="space-around">
            <v-btn outlined>
              <v-icon color="#BDBDBD"> mdi-menu-up </v-icon>
              3
            </v-btn>
            <v-btn outlined active-class="ac">
              <v-icon color="#BDBDBD"> mdi-menu-down </v-icon> 3
            </v-btn>
            <v-btn outlined @click="Mark()"> 북마크 </v-btn>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-alert
            v-if="login"
            border="top"
            color="red lighten-2"
            dark
            @click="tp"
          >
            북마크는 로그인이 필요합니다 (클릭)
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { Viewer } from "@toast-ui/vue-editor";

export default {
  name: "BoardArticleCard",
  components: {
    viewer: Viewer,
  },
  data() {
    return {
      login: false,
      viewerText: `<ol><li><p><strong>asdf<em>asdfsdfasdfsdfsdfdsfdsdfs</em></strong></p></li><li><p>dsfa</p><ol><li><p>df</p></li></ol></li><li><p>sdf</p><table class=""><thead><tr><th><p>sdf</p></th><th><p>sdfsf</p></th><th><p>sdf</p></th></tr></thead><tbody><tr><td><p>sdf</p></td><td><p>fdsf</p></td><td><p>sdf</p></td></tr><tr><td><p>asdf</p></td><td><p>fsdf</p></td><td><p>sd</p></td></tr><tr><td><p>dsf</p></td><td><p>dsf</p></td><td><p>dsf</p><p><br class="ProseMirror-trailingBreak"></p></td></tr></tbody></table></li></ol><p><br class="ProseMirror-trailingBreak"></p><div contenteditable="false"><hr></div><p><br class="ProseMirror-trailingBreak"></p><p><br class="ProseMirror-trailingBreak"></p><p><br class="ProseMirror-trailingBreak"></p>`,
    };
  },
  methods: {
    tp() {
      this.login = this.login ? true : false;
    },
  },
};
</script>

<style scoped></style>
