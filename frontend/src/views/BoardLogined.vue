<template>
  <v-app app>
    <AppbarLogined />

    <v-main class="back">
      <v-container fluid>
        <v-row class="mt-9" fill-height justify="center">
          <v-col
            v-if="
              $vuetify.breakpoint.xl ||
              $vuetify.breakpoint.lg ||
              $vuetify.breakpoint.md
            "
            md="2"
            class=""
          >
            <v-card flat> Card </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <BoardCard class="mb-6" />
            <BoardCardList />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppbarLogined from "@/components/AppbarLogined.vue";
import BoardCard from "@/components/BoardCard.vue";
import BoardCardList from "@/components/BoardCardList.vue";

export default {
  name: "BoardLogined",
  components: {
    AppbarLogined,
    BoardCard,
    BoardCardList,
  },
};
</script>

<style></style>
