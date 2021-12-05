<template>
  <v-row>
    <v-col cols="12" class="pa-0">
      <template v-for="(item, index) in list">
        <v-container v-if="page == index + 1" :key="index">
          <v-card
            v-for="(stock, idx) in item"
            :key="idx"
            tile
            elevation="1"
            class="mb-2"
            :href="`${stock.report_url}`"
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
                    {{ stock.company_name }}
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    label
                    text-color="white"
                    color="grey darken-2"
                  >
                    {{ stock.industry_type }}
                  </v-chip>
                </div>
                <v-list-item-title class="text-left headline">
                  {{ stock.report_title }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-left subtitle">
                  {{ stock.anal_name }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-btn
                class="mx-2"
                fab
                icon
                :href="`https://finance.naver.com/item/main.naver?code=${stock.company_no}`"
                target="_black"
              >
                <v-icon dark large> mdi-open-in-new </v-icon>
              </v-btn>
              <v-btn v-if="auth == false" class="mx-2" fab disabled icon>
                <v-icon dark color="pink"> mdi-heart </v-icon>
              </v-btn>
              <v-btn
                v-if="auth == true"
                :id="`button${stock.report_no}`"
                class="mx-2"
                fab
                icon
                @click.prevent="
                  [likeReport(stock.report_no), changebutton(stock.report_no)]
                "
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
    </v-col>
  </v-row>
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
    ...mapState("list", ["list", "listCount"]),
    ...mapState("auth", ["auth", "userId"]),
    pages() {
      return Math.ceil(this.listCount / 20);
    },
  },
  methods: {
    changebutton(report_no) {
      var elem = document.getElementById(`button${report_no}`);
      elem.icon = "mdi-heart";
    },
    async likeReport(report_no) {
      try {
        const response = await ReportApi.likeReports(this.userId, report_no);
        if (response.status === 200) {
          this.$store.dispatch("list/callData");
          console.log(response);
        }
      } catch (err) {
        if (err.response.status === 500) {
          console.log(err.response);
        }
      }
    },
    async unlikeReport(title) {
      try {
        const response = await ReportApi.unlikeReports(this.userId, title);
        if (response.status === 200) {
          this.$store.dispatch("list/callData");
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
