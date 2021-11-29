<template>
  <v-app app>
    <v-main class="back">
      <v-container fill-height fluid>
        <v-row justify="center">
          <v-col cols="12" md="5">
            <v-card
              class="mx-auto"
              max-width="550px"
              max-height="700px"
              tile
              style="border: solid"
            >
              <v-container fluid>
                <v-form ref="form" lazy-validation class="mx-6">
                  <!-- 인증 완료 -->
                  <v-row class="mt-6">
                    <v-col cols="12">
                      <v-card flat class="text-center my-6">
                        <router-link
                          class="text-h4 font-weight-black"
                          to="/report"
                          :style="{ color: 'black', textDecoration: 'none' }"
                        >
                          Mojuri
                        </router-link>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <p class="text-h5 text-left font-weight-bold">
                        {{ title }}
                      </p>
                      <v-divider class="divider"></v-divider>
                    </v-col>
                  </v-row>
                  <!-- 설명  -->
                  <v-row>
                    <v-col cols="12">
                      <p class="pr-6 mb-0 text-subtitle-1 text-left">
                        {{ subtitle }}
                      </p>
                    </v-col>
                  </v-row>
                  <v-row justify="center" class="my-16">
                    <v-col cols="6">
                      <v-btn
                        dark
                        block
                        large
                        tile
                        class="blue lighten-1 text-h5 font-weight-bold"
                        to="/user-authentication"
                      >
                        로그인
                      </v-btn>
                    </v-col>
                  </v-row>
                  <!-- 로그인하기 -->
                </v-form>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as authApi from "@/api/auth";
export default {
  name: "EmailAuthenticationDone",
  components: {},
  data() {
    return {
      title: "",
      subtitle: "",
    };
  },
  async created() {
    try {
      const response = await authApi.emailAuth(this.$route.params.id);

      if (response.status === 200) {
        this.title = "인증이 성공적으로 끝났습니다.";
        this.subtitle = "메일인증이 완료되었습니다.";
      }
    } catch (err) {
      this.title = "404 Not Found";
      this.subtitle = "페이지를 찾을 수 없습니다.";
    }
  },
};
</script>

<style></style>
