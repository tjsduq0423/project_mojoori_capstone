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
            @click="IncreaseViews(stock.report_no, stock.report_url)"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-left">
                  <v-chip
                    v-if="stock.company_name != null"
                    class="mr-4"
                    label
                    text-color="white"
                    color="deep-orange darken-1"
                    @click.stop="searchTagStock(stock.company_name)"
                  >
                    {{ stock.company_name }}
                  </v-chip>
                  <v-chip
                    v-if="stock.industry_type != null"
                    class="mr-4"
                    label
                    text-color="white"
                    color="amber darken-1"
                    @click.stop="searchTagIndustry(stock.industry_type)"
                  >
                    {{ stock.industry_type }}
                  </v-chip>

                  <span class="aa"> {{ stock.report_date }}</span>
                </div>

                <v-list-item-title
                  class="text-left"
                  :style="{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    marginTop: '5px',
                  }"
                >
                  {{ stock.report_title }}
                </v-list-item-title>
                <p :style="{ fontSize: '0.9rem' }">
                  {{ stock.anal_name }}
                </p>

                <template v-if="stock.cla_no == 1">
                  <div class="text-right">
                    <span
                      v-if="stock.report_tp != 0 && stock.report_tp != -1"
                      :style="{ color: 'grey', fontWeight: 'bold' }"
                      >목표주가: {{ stock.report_tp }} 상승여력:
                      {{ stock.report_upside }}%</span
                    >

                    <span v-else :style="{ color: 'grey', fontWeight: 'bold' }"
                      >목표주가: N/A</span
                    >
                  </div>
                </template>
              </v-list-item-content>

              <v-btn
                v-if="stock.company_no != null"
                class="mx-2"
                fab
                icon
                @click.stop="GoNaver(stock.company_no)"
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
                @click.stop="likeReport(stock.report_no)"
              >
                <v-icon dark color="pink" large> mdi-heart-outline </v-icon>
              </v-btn>
              <v-btn
                v-else
                class="mx-2"
                fab
                icon
                @click.stop="unlikeReport(stock.report_no)"
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
    GoNaver(company_no) {
      window.open(
        `https://finance.naver.com/item/main.naver?code=${company_no}`,
        "_blank"
      );
    },
    async IncreaseViews(report_no, report_url) {
      try {
        window.open(`${report_url}`, "_blank");
        await ReportApi.IncreaseViews(report_no);
      } catch (err) {
        if (err.response.status === 500) {
          console.log(err.response.data.message);
        }
      }
    },
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
            console.log(err.response.data.message);
          }
        }
      }
    },
    async likeReport(report_no) {
      try {
        this.likereports.push(report_no);
        await ReportApi.likeReports(this.userId, report_no);
      } catch (err) {
        if (err.response.status === 500) {
          console.log(err.response.data.message);
        }
      }
    },
    async unlikeReport(report_no) {
      try {
        this.likereports.splice(this.likereports.indexOf(report_no), 1);
        await ReportApi.unlikeReports(this.userId, report_no);
      } catch (err) {
        if (err.response.status === 500) {
          console.log(err.response.data.message);
        }
      }
    },
  },
};
</script>

<style scoped>
.aa {
  float: right !important;
}
</style>
