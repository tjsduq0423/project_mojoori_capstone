<template>
  <v-card max-width="900px" min-width="400px" class="mx-auto mt-3" flat>
    <v-row>
      <v-col cols="auto" class="mt-6 ml-6 pa-0">
        <p class="text-h5 text-left font-weight-black ml-8 mb-10">내 북마크</p>
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
            <v-list-item-action class="mt-12">
              <v-list-item-action-text class="mr-3">
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
        <v-btn>
          <v-icon> mdi-menu-left </v-icon>
          이전
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn class="ml-auto"
          >다음
          <v-icon> mdi-menu-right </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      page: 2,
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
        {
          _id: 3,
          title: "아무제목",
          writer: "아무개",
          likeCount: 8,
          lastTime: 10,
          theme: "자유",
        },
        {
          _id: 4,
          title: "아무제목",
          writer: "아무개",
          likeCount: 8,
          lastTime: 10,
          theme: "자유",
        },
        {
          _id: 5,
          title: "아무제목",
          writer: "아무개",
          likeCount: 8,
          lastTime: 10,
          theme: "자유",
        },
        {
          _id: 6,
          title: "아무제목",
          writer: "아무개",
          likeCount: 8,
          lastTime: 10,
          theme: "자유",
        },
        {
          _id: 7,
          title: "아무제목",
          writer: "아무개",
          likeCount: 8,
          lastTime: 10,
          theme: "자유",
        },
        {
          _id: 8,
          title: "아무제목",
          writer: "아무개",
          likeCount: 8,
          lastTime: 10,
          theme: "자유",
        },
        {
          _id: 9,
          title: "아무제목",
          writer: "아무개",
          likeCount: 8,
          lastTime: 10,
          theme: "자유",
        },
        {
          _id: 10,
          title: "아무제목",
          writer: "아무개",
          likeCount: 8,
          lastTime: 10,
          theme: "자유",
        },
        {
          _id: 11,
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
  },
};
</script>

<style></style>
