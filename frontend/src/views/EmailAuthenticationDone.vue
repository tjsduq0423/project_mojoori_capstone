<template>
  <v-app app>
    <AppbarNone />
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
                      <p class="text-h4 text-center font-weight-black">
                        Mojuri
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <p class="text-h5 text-left font-weight-bold">
                        인증 완료
                      </p>
                      <v-divider class="divider"></v-divider>
                    </v-col>
                  </v-row>
                  <!-- 설명  -->
                  <v-row>
                    <v-col cols="12">
                      <p class="pr-6 mb-0 text-subtitle-1 text-left">
                        메일 인증이 완료 되었습니다.
                      </p>
                    </v-col>
                  </v-row>
                  <!-- 클릭시 axios 요청 후에 router.push 콜백으로 받아서 페이지 이동 구현 필요
              https://router.vuejs.org/kr/guide/essentials/navigation.html
            -->

                  <!-- 로그인 버튼 -->
                  <v-row justify="center" class="my-16">
                    <v-col cols="6">
                      <v-btn
                        dark
                        block
                        large
                        tile
                        class="grey lighten-1 text-h5 font-weight-bold"
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
import AppbarNone from "@/components/AppbarNone.vue";

export default {
  name: "EmailAuthenticationDone",
  components: {
    AppbarNone,
  },
};
</script>

<style></style>
