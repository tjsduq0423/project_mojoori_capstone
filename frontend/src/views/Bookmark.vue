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
          <v-col md="3" sm="3" xs="3">
            <BoardBox :style="{ top: '88px', position: 'sticky' }" />
          </v-col>
          <v-col md="8" sm="8" class="mr-16">
            <BookmarkCardList />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppbarLogined from "@/components/AppbarLogined.vue";
import BoardBox from "@/components/BoardBox.vue";
import BookmarkCardList from "@/components/BookmarkCardList.vue";
export default {
  name: "Bookmark",
  components: {
    AppbarLogined,
    BoardBox,
    BookmarkCardList,
  },
};
</script>

<style></style>
