<template>
  <v-app>
    <v-card height="400" elevation="11" class="card">
      <v-card-title class="justify-center text-h5 white--text black">
        인기종목
      </v-card-title>
      <v-chip
        v-for="(popularstock, i) in popularstocks"
        :key="i"
        class="ma-2 mx-2"
        label
        text-color="white"
        color="deep-orange darken-1"
        @click="추천수++"
      >
        {{ popularstock }}
      </v-chip>
    </v-card>
    <p>추천수={{ 추천수 }}</p>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      popularstocks: [
        "삼성전자",
        "엘지디스플레이",
        "이마트",
        "에코프로",
        "에코프로비엠",
        "lg화학",
        "sk하이닉스",
        "sm엔터",
        "카카오",
        "네이버",
      ],
      추천수: 0,
    };
  },
};
</script>

<style>
.card {
  width: 20%;
  border-radius: 20px !important;
  border-color: black !important;
  border: solid 1em;
  border-width: medium !important;
}
</style>
