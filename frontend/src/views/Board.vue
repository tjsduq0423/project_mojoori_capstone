<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container class="mx-auto my-auto">
        <BoardCard />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import BoardCard from "@/components/BoardCard.vue";
export default {
  name: "Board",
  components: {
    Appbar,
    BoardCard,
  },
};
</script>
<style scoped></style>
