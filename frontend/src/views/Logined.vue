<template>
  <v-app app>
    <AppbarLogined />
    <v-main app class="back">
      <!-- SerchComponent  -->
    </v-main>
  </v-app>
</template>

<script>
import AppbarLogined from "@/components/AppbarLogined.vue";
export default {
  name: "Logined",
  components: {
    AppbarLogined,
  },
};
</script>

<style>
.back {
  background-color: #f2f2f2 !important;
}
</style>
