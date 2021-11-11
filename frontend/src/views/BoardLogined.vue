<template>
  <v-app app>
    <AppbarLogined />

    <v-main class="back">
      <v-container fluid>
        <v-row
          class="mt-8"
          fill-height
          align-content="space-around"
          justify="center"
        >
          <v-col
            v-if="
              $vuetify.breakpoint.xl ||
              $vuetify.breakpoint.lg ||
              $vuetify.breakpoint.md
            "
            md="3"
            class="py-0"
          >
            <BoardBox :style="{ top: '88px', position: 'sticky' }" />
          </v-col>
          <v-col md="8" class="mr-16 pt-0">
            <BoardCard class="mb-6" />
            <BoardCardList :login="true" />
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
import BoardBox from "@/components/BoardBox.vue";
export default {
  name: "BoardLogined",
  components: {
    AppbarLogined,
    BoardCard,
    BoardCardList,
    BoardBox,
  },
};
</script>

<style></style>
