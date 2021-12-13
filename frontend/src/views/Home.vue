<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container>
        <v-row>
          <v-card to="/report" class="mt-8" style="width: 100%">
            <v-img height="600" src="@/assets/background.jpg">
              <p
                align="center"
                style="color: white; margin-top: 200px"
                class="text-h3 font-weight-black"
              >
                모아보는 주식 리포트
              </p>
              <p
                align="center"
                style="margin-top: 0px; color: white"
                class="font-weight-black text-h3 mt-9 mb-0"
              >
                시작하기
              </p>
              <p align="center" class="mt-0">
                <v-icon color="white" right size="80"> mdi-gesture-tap</v-icon>
              </p>
            </v-img>
          </v-card>
        </v-row>
        <v-row>
          <v-col>
            <v-card outlined color="transparent">
              <v-card-text align="center">
                <v-icon size="100" color="blue lighten-2">mdi-database</v-icon>

                <p
                  class="text--primary"
                  style="font-size: 24px; font-weight: bold; margin-top: 10px"
                >
                  "모아보고"
                </p>
                <p class="text--primary" style="font-size: 16px">
                  국내 5대 증권사 포함 22곳의 증권사
                </p>
                <p class="text--primary" style="font-size: 16px">
                  리포트를 한곳에서
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card outlined color="transparent">
              <v-card-text align="center">
                <v-icon size="100" color="blue lighten-2">mdi-factory</v-icon>

                <p
                  class="text--primary"
                  style="font-size: 24px; font-weight: bold; margin-top: 10px"
                >
                  "나눠보고"
                </p>
                <p
                  class="text--primary"
                  style="font-size: 16px; margin-top: 20px"
                >
                  기업, 산업, 시장 별로 나눠보는
                </p>
                <p class="text--primary" style="font-size: 16px">
                  25개의 산업분야 별로 나눠보는
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card outlined color="transparent">
              <v-card-text align="center">
                <v-icon size="100" color="blue lighten-2">mdi-hand-coin</v-icon>
                <p
                  class="text--primary"
                  style="font-size: 24px; font-weight: bold; margin-top: 10px"
                >
                  "골라보는"
                </p>
                <p
                  class="text--primary"
                  style="font-size: 16px; margin-top: 20px"
                >
                  매일 매일 올라오는 리포트를
                </p>
                <p class="text--primary" style="font-size: 16px">
                  관심있는 종목만 ,관심있는 산업만 골라보는
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";

export default {
  name: "Home",
  components: {
    Appbar,
  },
  data() {
    return {};
  },
  mounted() {
    this.callInterest();
  },
  methods: {
    callInterest() {
      this.$store.dispatch("interest/callInterest");
    },
  },
};
</script>

<style>
.card {
  width: 80%;
  border-radius: 20px !important;
  border-color: black !important;
  border: solid 1em;
  border-width: medium !important;
}
</style>
