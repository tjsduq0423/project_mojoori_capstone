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
            md="3"
            class=""
          >
            <BoardBox />
          </v-col>
          <v-col cols="12" md="8">
            <BoardWriteCard />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppbarLogined from "@/components/AppbarLogined.vue";
import BoardWriteCard from "@/components/BoardWriteCard.vue";
import BoardBox from "@/components/BoardBox.vue";
export default {
  name: "BoardWrite",
  components: {
    AppbarLogined,
    BoardWriteCard,
    BoardBox,
  },
};
</script>

<style></style>
