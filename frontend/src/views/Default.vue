<template>
  <v-app app>
    <Appbar />

    <v-main app class="back">
      <v-layout align-center justify-center fill-height>
        <Search />
      </v-layout>
      <!-- SerchComponent  -->
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import Search from "@/components/Search.vue";
export default {
  name: "Default",
  components: {
    Appbar,
    Search,
  },
};
</script>

<style></style>
