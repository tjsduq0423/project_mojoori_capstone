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
            <v-card-actions>
              <v-btn
                class="mx-2"
                fab
                icon
                :href="`${stock.pdfUrl}`"
                target="_black"
              >
                <v-icon dark large> mdi-open-in-new </v-icon>
              </v-btn>
              <v-btn v-if="login == false" class="mx-2" fab disabled icon>
                <v-icon dark color="pink"> mdi-heart </v-icon>
              </v-btn>
              <v-btn
                v-if="(stock.likes == false) & (login == true)"
                class="mx-2"
                fab
                icon
              >
                <v-icon dark color="pink" large> mdi-heart-outline </v-icon>
              </v-btn>
              <v-btn
                v-if="(stock.likes == true) & (login == true)"
                class="mx-2"
                fab
                icon
              >
                <v-icon dark color="pink"> mdi-heart </v-icon>
              </v-btn>
            </v-card-actions>
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
import { mapState } from "vuex";
export default {
  name: "ReportCardList",
  props: {
    login: Boolean,
  },
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
    pages() {
      return Math.ceil(this.listCount / 20);
    },
  },
  mounted() {},
  methods: {
    onClickpdf: function (pdfUrl2) {
      window.open(pdfUrl2, "_blank");
    },
  },
};
</script>

<style scoped></style>
