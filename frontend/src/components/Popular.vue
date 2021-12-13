<template>
  <v-card min-height="280px" width="380px" elevation="1">
    <v-tooltip v-if="item.title === '추천저자'" top color="blue lighten-1">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title
          class="justify-center text-h5 white--text light-blue accent-1"
          v-bind="attrs"
          v-on="on"
        >
          {{ item.title }}
        </v-card-title>
      </template>
      <!-- :style="{ backgroundColor: 'white' }" -->
      <span
        >리포트 작성 당시 상승여력과 추후의 주가를 비교하여 계산한 정확도 점수
        상위 8명의 저자</span
      >
    </v-tooltip>
    <v-card-title
      v-else
      class="justify-center text-h5 white--text light-blue accent-1"
    >
      {{ item.title }}
    </v-card-title>
    <template v-if="item.title == '인기종목'">
      <v-chip
        v-for="(popularcompany, i) in PopularStock"
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
    <template v-else-if="item.title == '추천저자'">
      <v-chip
        v-for="(popularauthor, i) in PopularAuthor"
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
        v-for="(popularindustry, i) in PopularIndustry"
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
import { mapState } from "vuex";
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
    return {};
  },
  computed: {
    ...mapState("tag", ["PopularStock", "PopularIndustry", "PopularAuthor"]),
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
