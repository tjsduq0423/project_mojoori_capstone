<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container>
        <v-row justify="center" class="mt-6">
          <v-col md="8" cols="12">
            <Search />
            <ReportCardList />
          </v-col>
          <v-col
            v-if="
              $vuetify.breakpoint.xl ||
              $vuetify.breakpoint.lg ||
              $vuetify.breakpoint.md
            "
            md="4"
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
        { title: "인기종목", color: "brown darken-2" },
        { title: "추천저자", color: "deep-orange darken-1" },
        { title: "인기산업", color: "grey darken-1" },
      ],
    };
  },
  mounted() {
    this.callInterest();
    this.callData();
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
  },
};
</script>

<style></style>
