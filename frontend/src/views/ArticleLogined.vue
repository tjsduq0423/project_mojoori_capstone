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
            class="py-0"
          >
            <BoardBox :style="{ top: '88px', position: 'sticky' }" />
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
                  <CommentCard :login="true" />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" md="8"> </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppbarLogined from "@/components/AppbarLogined.vue";
import BoardArticleCard from "@/components/BoardArticleCard.vue";
import CommentCard from "@/components/CommentCard.vue";
import BoardBox from "@/components/BoardBox.vue";
export default {
  name: "ArticleLogined",
  components: {
    AppbarLogined,
    BoardArticleCard,
    CommentCard,
    BoardBox,
  },
};
</script>

<style></style>
