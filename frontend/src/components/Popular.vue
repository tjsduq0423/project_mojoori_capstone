<template>
  <v-card min-height="250px" max-width="400px" elevation="5" class="card">
    <v-card-title class="justify-center text-h5 white--text black">
      {{ item.title }}
    </v-card-title>
    <v-chip
      v-for="(popularauthor, i) in popularauthors"
      :key="i"
      class="ma-2"
      label
      text-color="white"
      :color="item.color"
      @click="추천수++"
    >
      {{ popularauthor }}
    </v-chip>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return { title: "인기종목", color: "brown darken-2" };
      },
    },
  },
  data() {
    return {
      popularauthors: [
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

<style scoped>
.card {
  width: 100%;
  border-radius: 20px !important;
  border-color: black !important;
  border: solid 1em;
  border-width: medium !important;
}
</style>
