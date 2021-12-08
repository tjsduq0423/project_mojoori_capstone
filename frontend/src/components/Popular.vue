<template>
  <v-card min-height="280px" width="380px" elevation="1">
    <v-card-title class="justify-center text-h5 white--text blue lighten-1">
      {{ item.title }}
    </v-card-title>
    <template v-if="item.title == '인기종목'">
      <v-chip
        v-for="(popularcompany, i) in popularcompanys"
        :key="i"
        class="ma-2"
        label
        text-color="white"
        :color="item.color"
        @click="ClickStockTag(popularcompany)"
      >
        {{ popularcompany }}
      </v-chip>
    </template>
    <template v-else-if="item.title == '인기저자'">
      <v-chip
        v-for="(popularauthor, i) in popularauthors"
        :key="i"
        class="ma-2"
        label
        text-color="white"
        :color="item.color"
        @click="ClickAuthorTag(popularauthor)"
      >
        {{ popularauthor }}
      </v-chip>
    </template>
    <template v-else>
      <v-chip
        v-for="(popularindustry, i) in popularindustries"
        :key="i"
        class="ma-2"
        label
        text-color="white"
        :color="item.color"
        @click="ClickIndustryTag(popularindustry)"
      >
        {{ popularindustry }}
      </v-chip>
    </template>
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
      popularindustries: ["통신", "레저", "제약", "우주,국방"],
      popularauthors: ["유지웅", "남성현", "박준호", "이상헌", "이동욱"],
      popularcompanys: [
        "삼성전자",
        "LG디스플레이",
        "이마트",
        "에코프로",
        "에코프로비엠",
        "LG화학",
        "sk하이닉스",
        "sm엔터",
        "카카오",
        "네이버",
      ],
    };
  },
  methods: {
    ClickStockTag(popularcompany) {
      this.$store.commit("tag/InsertTags", {
        selection: "종목",
        magnify: popularcompany,
      });
      this.$store.dispatch("list/callSearchData", {
        selection: "종목",
        magnify: popularcompany,
      });
    },
    ClickAuthorTag(popularauthor) {
      this.$store.commit("tag/InsertTags", {
        selection: "저자",
        magnify: popularauthor,
      });
      this.$store.dispatch("list/callSearchData", {
        selection: "저자",
        magnify: popularauthor,
      });
    },
    ClickIndustryTag(popularindustry) {
      this.$store.commit("tag/InsertTags", {
        selection: "산업",
        magnify: popularindustry,
      });
      this.$store.dispatch("list/callSearchData", {
        selection: "산업",
        magnify: popularindustry,
      });
    },
  },
};
</script>

<style scoped>
/* .card {
  width: 100%;
  border-radius: 20px !important;
  border-color: black !important;
  border: solid 1em;
  border-width: medium !important;
} */
</style>
