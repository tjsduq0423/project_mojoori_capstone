<template>
  <v-app app>
    <AppbarLogined />
    <v-main app class="back">
      <v-layout align-content-space-around justify-center fill-height>
        <v-flex md8 sm8>
          <Search />
          <ReportCardList />
        </v-flex>
        <v-flex md4 sm4>
          <PopularStock />
          <PopularAuthor />
          <PopularIndustry />
        </v-flex>
      </v-layout>
      <!-- SerchComponent  -->
    </v-main>
  </v-app>
</template>

<script>
import AppbarLogined from "@/components/AppbarLogined.vue";
import Search from "@/components/Search.vue";
import ReportCardList from "@/components/ReportCardList.vue";
import PopularStock from "@/components/PopularStock.vue";
import PopularAuthor from "@/components/PopularAuthor.vue";
import PopularIndustry from "@/components/PopularIndustry.vue";
export default {
  name: "Logined",
  components: {
    AppbarLogined,
    Search,
    ReportCardList,
    PopularStock,
    PopularAuthor,
    PopularIndustry,
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
