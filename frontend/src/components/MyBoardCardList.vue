<template>
  <v-card width="100%" tile elevation="1">
    <v-container class="pa-0">
      <v-row>
        <v-col cols="auto" class="mt-9 ml-12 pa-0">
          <p class="text-h5 text-left font-weight-black mb-9">
            게시글 리스트({{ articles.length }})
          </p>
        </v-col>
      </v-row>
      <v-list class="pa-0">
        <v-list-item-group>
          <template v-for="(article, index) in articles">
            <!-- v-list-item 에 추가 + ariticle link :to="`board/article/${article._id}`"" -->
            <v-list-item
              :key="index"
              two-line
              class="pa-0"
              @click="viewArticle(index)"
            >
              <v-btn text disabled>
                <v-row justify="center" align="center">
                  <v-col cols="12" class="pa-0">
                    <v-icon>mdi-menu-up</v-icon>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <div>{{ article.likeCount }}</div>
                  </v-col>
                </v-row>
              </v-btn>

              <v-list-item-content>
                <v-list-item-title>{{ article.title }} </v-list-item-title>
                <v-list-item-subtitle class="mt-3">
                  {{ article.theme }} | {{ article.writer }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text class="mr-3">
                  <v-btn
                    dark
                    large
                    elevation="1"
                    class="mt-0 mr-6 blue lighten-1"
                    @click.capture.stop="clickEdit()"
                    >수정</v-btn
                  >
                  <v-btn
                    dark
                    large
                    elevation="1"
                    class="mt-0 mr-6 red lighten-1"
                    @click.capture.stop="clickRemove()"
                    >삭제</v-btn
                  >
                  {{ article.lastTime }} 시간 전
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="`${index} - divider`"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
      <v-row align="center" justify="center" class="mt-3">
        <v-col cols="3"></v-col>
        <v-col v-if="page > 1" cols="auto">
          <v-btn elevation="1">
            <v-icon> mdi-menu-left </v-icon>
            이전
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn class="ml-auto" elevation="1"
            >다음
            <v-icon> mdi-menu-right </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      articles: [
        {
          _id: 1,
          title: "아무제목",
          writer: "아무개",
          likeCount: 8,
          lastTime: 10,
          theme: "자유",
        },
        {
          _id: 2,
          title: "아무제목",
          writer: "아무개",
          likeCount: 8,
          lastTime: 10,
          theme: "자유",
        },
      ],
    };
  },
  methods: {
    viewArticle(index) {
      this.$router.push({ path: `/article/${this.articles[index]._id}` });
    },
    clickEdit() {
      console.log("test");
    },
    clickRemove() {
      console.log("test remove");
    },
  },
};
</script>

<style></style>
