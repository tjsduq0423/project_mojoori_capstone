<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container class="px-0 pt-0">
        <v-row justify="center">
          <v-col
            v-if="
              $vuetify.breakpoint.xl ||
              $vuetify.breakpoint.lg ||
              $vuetify.breakpoint.md
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
import Appbar from "@/components/Appbar.vue";
import BoardCard from "@/components/BoardCard.vue";
import BoardCardList from "@/components/BoardCardList.vue";
import BoardBox from "@/components/BoardBox.vue";

export default {
  name: "Board",
  components: {
    Appbar,
    BoardBox,
    BoardCard,
    BoardCardList,
  },
  data() {
    return {};
  },
};
</script>
<style scoped></style>
