<template>
  <v-app app>
    <Appbar />

    <v-main app class="back">
      <v-layout align-center justify-center fill-height>
        <Search />
        <PopularStock />
      </v-layout>
      <!-- SerchComponent  -->
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import Search from "@/components/Search.vue";
import PopularStock from "@/components/PopularStock.vue";
export default {
  name: "Default",
  components: {
    Appbar,
    Search,
    PopularStock,
  },
};
</script>

<style>
.back {
  background-color: #f2f2f2 !important;
}
</style>
