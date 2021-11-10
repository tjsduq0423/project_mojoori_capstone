<template>
  <v-card height="280" elevation="11" class="card mx-auto mt-3">
    <v-card-title class="justify-center text-h5 white--text black">
      인기산업
    </v-card-title>
    <v-chip
      v-for="(popularindustry, i) in popularindustrys"
      :key="i"
      class="ma-2"
      label
      text-color="white"
      color="grey darken-1"
      @click="추천수++"
    >
      {{ popularindustry }}
    </v-chip>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      popularindustrys: [
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

<style></style>
