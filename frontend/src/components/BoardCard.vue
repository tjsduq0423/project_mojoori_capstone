<template>
  <v-card
    width="900px"
    height="130px"
    class="ma-auto"
    outlined
    style="border-width: 0px"
  >
    <v-layout justify-space-between>
      <v-flex class="mt-3 ml-3">
        <p class="ma-2 text-left headline font-weight-black">게시판</p>
      </v-flex>
      <v-flex class="mt-3 mr-3" shrink>
        <!-- 글쓰기 버튼 -->
        <v-btn
          class="title font-weight-bold"
          style="color: #6ce422"
          text
          to="/board-write"
        >
          글쓰기
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout justify-space-between>
      <v-flex class="ml-3 mt-3">
        <!-- 인기 최신 추천상위 분류 버튼 -->
        <v-btn-toggle v-model="text" group>
          <v-btn
            v-for="(btn, i) in btns"
            :key="i"
            class="mr-12"
            :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
            :value="btn.value"
            active-class="ac"
            >{{ btn.text }}</v-btn
          >
        </v-btn-toggle>
      </v-flex>
      <v-flex class="mr-3 mt-4" shrink>
        <!-- 게시글 제목을 통한 검색 바 -->
        <v-text-field
          v-model="magnify"
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
      </v-flex>
    </v-layout>
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
        { value: "Recommendation", text: "추천상위" },
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
.v-text-field--outlined fieldset {
  border-width: 4px !important;
  color: black !important;
}
.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
</style>
