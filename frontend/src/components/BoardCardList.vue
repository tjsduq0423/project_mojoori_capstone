<template>
  <v-card width="100%" class="mx-auto" tile elevation="1">
    <v-list class="pa-0">
      <v-list-item-group>
        <template v-for="(article, index) in articles[page - 1]">
          <!-- v-list-item 에 추가 + ariticle link :to="`board/article/${article._id}`"" -->
          <v-list-item
            :key="index"
            two-line
            class="pa-0"
            @click="viewArticle(article.board_id)"
          >
            <v-btn text disabled>
              <v-row justify="center" align="center">
                <v-col cols="12" class="pa-0">
                  <v-icon>mdi-menu-up</v-icon>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <div>{{ article.board_like }}</div>
                </v-col>
              </v-row>
            </v-btn>

            <v-list-item-content>
              <v-list-item-title>{{ article.board_title }} </v-list-item-title>
              <v-list-item-subtitle class="mt-3">
                {{ article.board_theme }} | {{ article.board_writer }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="`${index} - divider`"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <v-row align="center" justify="center" class="mt-3">
      <v-col cols="3"></v-col>
      <v-col v-if="page > 1" cols="auto">
        <v-btn tile elevation="1" @click="page--">
          <v-icon> mdi-menu-left </v-icon>
          이전
        </v-btn>
      </v-col>
      <v-col v-if="page < pages" cols="auto">
        <v-btn class="ml-auto" tile elevation="1" @click="page++"
          >다음
          <v-icon> mdi-menu-right </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState("board", ["articles", "pages"]),
  },
  methods: {
    viewArticle(id) {
      this.$router.push({
        path: `/article/${id}`,
      });
    },
  },
};
</script>

<style></style>
