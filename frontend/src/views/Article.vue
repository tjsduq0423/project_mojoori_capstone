<template>
  <v-app app>
    <Appbar />

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
            class="py-0"
          >
            <v-card flat> Card </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-container fluid class="pa-0">
              <v-row>
                <v-col>
                  <BoardArticleCard />
                </v-col>
              </v-row>
              <v-row class="mt-6">
                <v-col>
                  <CommentCard />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
<<<<<<< HEAD
          <v-col cols="12" md="8">
            <BoardArticleCard />
          </v-col>
=======
          <v-col cols="12" md="8"> </v-col>
>>>>>>> dev/moon
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import BoardArticleCard from "@/components/BoardArticleCard.vue";
import CommentCard from "@/components/CommentCard.vue";
export default {
  name: "Article",
  components: {
    Appbar,
    BoardArticleCard,
    CommentCard,
  },
};
</script>

<style></style>
