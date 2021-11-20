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
          <v-btn-toggle v-model="text" group>
            <v-btn
              v-for="(btn, i) in btns"
              :key="i"
              class="px-5 mx-4"
              :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
              :value="btn.value"
              active-class="ac"
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
            @keyup.enter="nothing()"
          >
            <!-- <v-icon slot="append" color="black" @click="nothing"
              >mdi-magnify</v-icon
            > -->
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
        { value: "popularity", text: "인기", icon: "mdi-fire" },
        { value: "Latest", text: "최신", icon: "mdi-update" },
        { value: "Recommendation", text: "추천", icon: "mdi-thumb-up-outline" },
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
