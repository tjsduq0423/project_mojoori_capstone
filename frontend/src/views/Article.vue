<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container fluid>
        <v-row class="mt-9" fill-height justify="center">
          <v-col cols="12" md="8">
            <BoardArticleCard />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import BoardArticleCard from "@/components/BoardArticleCard.vue";
export default {
  name: "Article",
  components: {
    Appbar,
    BoardArticleCard,
  },
};
</script>

<style></style>
