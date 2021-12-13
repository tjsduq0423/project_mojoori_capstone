<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container fluid class="">
        <v-row justify="center" class="mt-6">
          <v-col md="6" cols="12">
            <Search />
            <ReportCardList />
          </v-col>
          <v-col
            v-if="
              $vuetify.breakpoint.xl ||
              $vuetify.breakpoint.lg ||
              $vuetify.breakpoint.md
            "
            md="3"
          >
            <v-row
              v-for="(item, index) in items"
              :key="index"
              class="mb-3"
              justify="center"
            >
              <Popular :item="item" class="mb-6" />
            </v-row>
          </v-col>
        </v-row>
        <!-- SerchComponent  -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import Search from "@/components/Search.vue";
import ReportCardList from "@/components/ReportCardList.vue";
import Popular from "@/components/Popular.vue";
import { mapState } from "vuex";
export default {
  name: "Report",
  components: {
    Appbar,
    Search,
    ReportCardList,
    Popular,
  },
  data() {
    return {
      items: [
        { title: "인기종목", color: "deep-orange darken-1" },
        { title: "추천저자", color: "lime darken-1" },
        { title: "인기산업", color: "amber darken-1" },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["userId"]),
  },
  mounted() {
    this.callInterest();
    this.callData();
    this.callPopularStock();
    this.callPopularIndustry();
    this.callPopularAuthor();
  },
  updated() {
    this.callData();
  },
  methods: {
    callInterest() {
      this.$store.dispatch("interest/callInterest");
    },
    callData() {
      this.$store.dispatch("list/callData");
    },
    callPopularStock() {
      this.$store.dispatch("tag/callPopularStock");
    },
    callPopularIndustry() {
      this.$store.dispatch("tag/callPopularIndustry");
    },
    callPopularAuthor() {
      this.$store.dispatch("tag/callPopularAuthor");
    },
  },
};
</script>

<style></style>
