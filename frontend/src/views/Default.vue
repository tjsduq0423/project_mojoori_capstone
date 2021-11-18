<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <Search />
            <ReportCardList :login="false" />
          </v-col>
          <v-col
            v-if="
              $vuetify.breakpoint.xl ||
              $vuetify.breakpoint.lg ||
              $vuetify.breakpoint.md
            "
            md="4"
          >
            <v-row v-for="(item, index) in items" :key="index">
              <v-col>
                <Popular :item="item" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
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
  name: "Default",
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
    this.callData();
  },

  methods: {
    callData() {
      this.$store.dispatch("list/callData");
    },
  },
};
</script>

<style>
.card {
  width: 80%;
  border-radius: 20px !important;
  border-color: black !important;
  border: solid 1em;
  border-width: medium !important;
}
</style>
