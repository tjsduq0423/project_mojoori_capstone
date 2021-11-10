<template>
  <v-app app>
    <AppbarLogined />

    <v-main class="back">
      <v-container>
        <v-row class="mt-9" fill-height>
          <v-col
            v-if="
              $vuetify.breakpoint.xl ||
              $vuetify.breakpoint.lg ||
              $vuetify.breakpoint.md
            "
            md="4"
            class="pr-16"
          >
            <v-card flat> Card </v-card>
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
export default {
  name: "BoardWrite",
  components: {
    AppbarLogined,
    BoardWriteCard,
  },
};
</script>

<style></style>
