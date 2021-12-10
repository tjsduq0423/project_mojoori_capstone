<template>
  <v-card width="100%" tile elevation="1">
    <v-container>
      <!-- 게시판 글쓰기 -->
      <v-row justify="space-between">
        <v-col cols="auto" class="mt-6 ml-6 pa-0">
          <p class="text-h5 text-left font-weight-black mb-0">게시판</p>
        </v-col>
        <v-col cols="auto" class="mt-3 mr-3 pa-0">
          <v-btn
            icon
            class="text-h6 font-weight-bold ac"
            large
            to="/board-write"
          >
            <v-icon> mdi-pencil-outline </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- 인기 최신 추천 상위 + 검색 바  -->
      <v-row justify="space-between">
        <v-col md="auto" cols="12">
          <v-btn-toggle v-model="text" group mandatory>
            <v-btn
              v-for="(btn, i) in btns"
              :key="i"
              class="px-5 mx-4"
              :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
              :value="btn.value"
              active-class="ac"
              @click="clickbutton(btn.text)"
            >
              <v-icon left large class="px-4">{{ btn.icon }}</v-icon>
              {{ btn.text }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col md="auto" cols="12" align-self="center">
          <v-text-field
            v-model="magnify"
            dense
            flat
            filled
            placeholder="제목"
            hide-details="auto"
            append-icon="mdi-magnify"
            @click:append="searchArticles()"
            @keyup.enter="searchArticles()"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "BoardCard",
  data() {
    return {
      text: "Latest",
      magnify: "",
      btns: [
        { value: "Latest", text: "최신순", icon: "mdi-update" },
        {
          value: "Recommendation",
          text: "추천순",
          icon: "mdi-thumb-up-outline",
        },
      ],
    };
  },
  methods: {
    searchArticles() {
      if (this.magnify) {
        this.$store.dispatch("board/searchArticles", {
          searchData: this.magnify,
          theme: this.$route.params.theme,
        });
        this.text = "Latest";
      }
      return;
    },
    clickbutton(text) {
      this.$store.commit("board/sortArticles", text);
    },
  },
};
</script>

<style scoped>
.ac {
  color: #6ce422 !important;
}
</style>
