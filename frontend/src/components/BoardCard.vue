<template>
  <v-card max-width="900px" min-width="400x" class="mx-auto" flat>
    <v-container>
      <!-- 게시판 글쓰기 -->
      <v-row justify="space-between">
        <v-col cols="auto" class="mt-6 ml-6 pa-0">
          <p class="text-h5 text-left font-weight-black mb-0">게시판</p>
        </v-col>
        <v-col cols="auto" class="mt-3 mr-3 pa-0">
          <v-btn class="text-h6 font-weight-bold ac" text to="/board-write">
            글쓰기
          </v-btn>
        </v-col>
      </v-row>

      <!-- 인기 최신 추천 상위 + 검색 바  -->
      <v-row>
        <v-col md="8" cols="12">
          <v-btn-toggle v-model="text" group>
            <v-btn
              v-for="(btn, i) in btns"
              :key="i"
              class="mx-6"
              :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
              :value="btn.value"
              active-class="ac"
              >{{ btn.text }}</v-btn
            >
          </v-btn-toggle>
        </v-col>
        <v-col md="4" cols="12" align-self="center">
          <v-text-field
            v-model="magnify"
            dense
            solo
            height="44px"
            label="제목"
            flat
            hide-details="auto"
            outlined
            style="border-radius: 15px"
          >
            <v-icon slot="append" color="black" large @click="nothing"
              >mdi-magnify</v-icon
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
      text: "popularity",
      magnify: "",
      btns: [
        { value: "popularity", text: "인기" },
        { value: "Latest", text: "최신" },
        { value: "Recommendation", text: "추천" },
      ],
    };
  },
  methods: {
    nothing() {
      console.log(this.magnify);
    },
  },
};
</script>

<style scoped>
.ac {
  color: #6ce422 !important;
}
</style>
