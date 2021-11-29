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
  mounted() {
    this.callArticles(this.$route.params.theme);
  },
  beforeRouteUpdate(to, from, next) {
    const theme_dict = {
      home: "home",
      stock: "종목",
      issue: "이슈",
      freedom: "자유",
      humor: "유머",
      tip: "팁과 노하우",
    };
    this.callArticles(theme_dict[to.params.theme]);
    next();
  },
  methods: {
    callArticles(theme) {
      this.$store.dispatch("board/callArticles", {
        theme,
      });
    },
  },
};
</script>
<style scoped></style>
