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
                    @click.prevent="searchTagStock(stock.company_name)"
                  >
                    {{ stock.company_name }}
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    label
                    text-color="white"
                    color="amber darken-1"
                    @click.prevent="searchTagIndustry(stock.industry_type)"
                  >
                    {{ stock.industry_type }}
                  </v-chip>
                </div>
                <v-list-item-title
                  class="text-left"
                  :style="{ fontSize: '1.1rem', fontWeight: 'bold' }"
                >
                  {{ stock.report_title }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-left subtitle">
                  {{ stock.anal_name }}
                </v-list-item-subtitle>

                <p v-if="stock.report_tp != 0" class="text-right">
                  목표주가: {{ stock.report_tp }} 상승여력:
                  {{ stock.report_upside }} 날짜: {{ stock.report_date }}
                </p>
                <p v-else class="text-right">목표주가를 제시하지 않음</p>
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
                v-else-if="auth == true && !including(stock.report_no)"
                :id="`button${stock.report_no}`"
                class="mx-2"
                fab
                icon
                @click.prevent="likeReport(stock.report_no)"
              >
                <v-icon dark color="pink" large> mdi-heart-outline </v-icon>
              </v-btn>
              <v-btn
                v-else
                class="mx-2"
                fab
                icon
                @click.prevent="unlikeReport(stock.report_no)"
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
      likereports: [],
    };
  },
  computed: {
    ...mapState("list", ["list", "listCount"]),
    ...mapState("auth", ["auth", "userId"]),
    pages() {
      return Math.ceil(this.listCount / 20);
    },
  },
  mounted() {
    this.getLikeReport();
  },
  methods: {
    searchTagStock(company) {
      this.$store.dispatch("list/callSearchData", {
        selection: "종목",
        magnify: company,
      });
    },
    searchTagIndustry(industry) {
      this.$store.dispatch("list/callSearchData", {
        selection: "산업",
        magnify: industry,
      });
    },
    including(reportNumber) {
      return this.likereports.includes(reportNumber);
    },
    async getLikeReport() {
      if (this.userId) {
        try {
          const response = await ReportApi.likeReport(this.userId);

          if (response.status === 200) {
            for (var i = 0; i < response.data.data.length; i++) {
              this.likereports.push(response.data.data[i].report_no);
            }
          }
        } catch (err) {
          if (err.response.status === 500) {
            console.log(err.response);
          }
        }
      }
    },
    changebutton(report_no) {
      var elem = document.getElementById(`button${report_no}`);
      elem.icon = "mdi-heart";
    },
    async likeReport(report_no) {
      try {
        this.likereports.push(report_no);
        const response = await ReportApi.likeReports(this.userId, report_no);
        if (response.status === 200) {
          console.log(response);
        }
      } catch (err) {
        if (err.response.status === 500) {
          console.log(err.response);
        }
      }
    },
    async unlikeReport(report_no) {
      try {
        this.likereports.splice(this.likereports.indexOf(report_no), 1);
        const response = await ReportApi.unlikeReports(this.userId, report_no);
        if (response.status === 200) {
          console.log(response);
        }
      } catch (err) {
        if (err.response.status === 500) {
          console.log(err.response);
        }
      }
    },
  },
};
</script>

<style scoped></style>
