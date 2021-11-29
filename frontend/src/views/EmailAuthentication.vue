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
                  <!-- 이메일 인증 안내 -->
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
                        이메일 인증 안내
                      </p>
                      <v-divider class="divider"></v-divider>
                    </v-col>
                  </v-row>
                  <!-- 설명  -->
                  <v-row>
                    <v-col cols="12">
                      <p
                        class="
                          pr-6
                          mb-0
                          text-subtitle-1 text-left
                          font-weight-bold
                        "
                      >
                        인증메일이 발송되었습니다.
                      </p>
                      <p
                        class="
                          pr-6
                          mb-0
                          text-subtitle-2 text-left text--disabled
                        "
                      >
                        메일을 30분 이내에 확인한 후 인증 링크를 클릭해야
                        회원가입을 완료할 수 있습니다.
                      </p>
                    </v-col>
                  </v-row>
                  <!-- 홈으로 -->
                  <v-row justify="center" class="my-16">
                    <v-col cols="6">
                      <v-btn
                        dark
                        block
                        large
                        tile
                        class="blue lighten-1 text-h5 font-weight-bold"
                        to="/report"
                      >
                        홈으로
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
export default {
  name: "EmailAuthentication",
  components: {},
};
</script>

<style></style>
