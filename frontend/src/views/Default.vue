<template>
  <v-app app>
    <Appbar />
    <v-main app>
      <!-- SerchComponent  -->
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";

export default {
  name: "DefaultPage",
  components: {
    Appbar,
  },
};
</script>
