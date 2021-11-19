<template>
  <div>
    <template v-for="(item, index) in list">
      <v-container
        v-if="page == index + 1"
        :key="index"
        class="mx-auto mb-auto"
      >
        <v-card
          v-for="(stock, idx) in item"
          :key="idx"
          outlined
          class="mb-3 grey lighten-3"
          :href="`${stock.pdfUrl}`"
          target="_black"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-left">
                <v-chip
                  class="mr-2"
                  label
                  text-color="white"
                  color="deep-orange darken-1"
                >
                  {{ stock.name }}
                </v-chip>
                <v-chip
                  v-for="(tags, index2) in stock.tag"
                  :key="index2"
                  class="ma-2"
                  label
                  text-color="white"
                  color="grey darken-2"
                >
                  {{ tags }}
                </v-chip>
              </div>
              <v-list-item-title class="text-left headline">
                {{ stock.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-left subtitle">
                {{ stock.author }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-btn
              class="mx-2"
              fab
              icon
              :href="'http://naver.com'"
              target="_black"
            >
              <v-icon dark large> mdi-open-in-new </v-icon>
            </v-btn>
            <v-btn v-if="auth == false" class="mx-2" fab disabled icon>
              <v-icon dark color="pink"> mdi-heart </v-icon>
            </v-btn>
            <v-btn
              v-if="auth == true && stock.likes == false"
              class="mx-2"
              fab
              icon
              @click.prevent="likeReport(stock.title)"
            >
              <v-icon dark color="pink" large> mdi-heart-outline </v-icon>
            </v-btn>
            <v-btn
              v-if="auth == true && stock.likes == true"
              class="mx-2"
              fab
              icon
              @click.prevent="unlikeReport(stock.title)"
            >
              <v-icon dark color="pink" large> mdi-heart </v-icon>
            </v-btn>
          </v-list-item>
        </v-card>
        <v-pagination
          v-model="page"
          :length="pages"
          :total-visible="7"
          circle
        ></v-pagination>
      </v-container>
    </template>
  </div>
</template>

<script>
import * as ReportApi from "@/api/report";
import { mapState } from "vuex";
export default {
  name: "ReportCardList",
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState("list", {
      list: (state) => state.list,
      listCount: (state) => state.listCount,
    }),
    ...mapState("auth", ["auth", "userId"]),
    pages() {
      return Math.ceil(this.listCount / 20);
    },
  },
  methods: {
    async likeReport(title) {
      try {
        const response = await ReportApi.likeReports(this.userId, title);
        if (response.status === 200) {
          console.log(response);
        }
      } catch (err) {
        if (err.response.status === 401) {
          console.log(err.response.data.message);
        }
      }
    },
    async unlikeReport(title) {
      try {
        const response = await ReportApi.unlikeReports(this.userId, title);
        if (response.status === 200) {
          console.log(response);
        }
      } catch (err) {
        if (err.response.status === 401) {
          console.log(err.response.data.message);
        }
      }
    },
  },
};
</script>

<style scoped></style>
