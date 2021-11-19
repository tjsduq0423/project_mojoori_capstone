<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container class="px-0 pt-0">
        <v-row justify="center">
          <v-col
            v-if="
              ($vuetify.breakpoint.xl ||
                $vuetify.breakpoint.lg ||
                $vuetify.breakpoint.md) &&
              $store.state.auth.auth
            "
            md="3"
          >
            <BoardBox :style="{ top: '64px', position: 'sticky' }" />
          </v-col>
          <v-col md="8">
            <BoardArticleCard class="mb-6" />
            <CommentCard />
          </v-col>
          <v-col cols="12" md="8"> </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import BoardArticleCard from "@/components/BoardArticleCard.vue";
import CommentCard from "@/components/CommentCard.vue";
import BoardBox from "@/components/BoardBox.vue";
export default {
  name: "Article",
  components: {
    Appbar,
    BoardArticleCard,
    CommentCard,
    BoardBox,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
