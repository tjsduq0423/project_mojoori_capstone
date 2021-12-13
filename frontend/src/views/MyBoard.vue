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
            <MyBoardCardList />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import BoardBox from "@/components/BoardBox.vue";
import MyBoardCardList from "@/components/MyBoardCardList.vue";
import { mapState } from "vuex";
export default {
  name: "MyBoard",
  components: {
    Appbar,
    BoardBox,
    MyBoardCardList,
  },
  computed: {
    ...mapState("auth", ["userId"]),
  },
  mounted() {
    this.callMyArticles();
  },
  methods: {
    callMyArticles() {
      this.$store.dispatch("board/callMyArticles", this.userId);
    },
  },
};
</script>

<style></style>
