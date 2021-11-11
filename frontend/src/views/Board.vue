<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container fluid>
        <v-row justify="center" class="mt-9">
          <v-col cols="12" md="8">
            <BoardCard />
          </v-col>
          <v-col cols="12" md="8">
            <BoardCardList />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import BoardCard from "@/components/BoardCard.vue";
import BoardCardList from "@/components/BoardCardList.vue";

export default {
  name: "Board",
  components: {
    Appbar,
    BoardCard,
    BoardCardList,
  },
  data() {
    return {};
  },
};
</script>
<style scoped></style>
