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
            <BoardBox />
          </v-col>
          <v-col md="8">
            <BoardWriteCard />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import BoardWriteCard from "@/components/BoardWriteCard.vue";
import BoardBox from "@/components/BoardBox.vue";
export default {
  name: "BoardWrite",
  components: {
    Appbar,
    BoardWriteCard,
    BoardBox,
  },
};
</script>

<style></style>
