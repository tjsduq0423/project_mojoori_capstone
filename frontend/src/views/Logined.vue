<template>
  <v-app app>
    <AppbarLogined />
    <v-main app>
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

<style></style>
