<template>
  <v-app app>
    <AppbarLogined />

    <v-main class="back">
      <v-container>
        <v-row class="mt-8" justify="center">
          <v-col
            v-if="
              $vuetify.breakpoint.xl ||
              $vuetify.breakpoint.lg ||
              ($vuetify.breakpoint.md && this.$store.state.auth.auth)
            "
            md="3"
          >
            <BoardBox :style="{ top: '64px', position: 'sticky' }" />
          </v-col>
          <v-col md="8">
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
