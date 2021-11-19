<template>
  <v-app app>
    <Appbar />

    <v-main class="back">
      <v-container>
        <v-row>
          <v-card to="/default" class="mt-12" style="width: 100%">
            <v-img height="600" src="@/assets/background.jpg">
              <p
                align="center"
                style="font-size: 32px; color: white; margin-top: 400px"
              >
                "모아보는 주식 리포트"
              </p>
            </v-img>
          </v-card>
        </v-row>
        <v-row>
          <v-col>
            <v-card outlined color="transparent">
              <v-card-text align="center">
                <v-icon size="100">mdi-hand-extended</v-icon>

                <p
                  class="text--primary"
                  style="font-size: 24px; font-weight: bold; margin-top: 10px"
                >
                  "나눠보는"
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
                <v-icon size="100">mdi-hand-extended</v-icon>

                <p
                  class="text--primary"
                  style="font-size: 24px; font-weight: bold; margin-top: 10px"
                >
                  "나눠보는"
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
                <v-icon size="100">mdi-hand-extended</v-icon>

                <p
                  class="text--primary"
                  style="font-size: 24px; font-weight: bold; margin-top: 10px"
                >
                  "나눠보는"
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
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";

export default {
  name: "Default",
  components: {
    Appbar,
  },
  data() {
    return {};
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
