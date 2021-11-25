<template>
  <v-app app>
    <v-main class="back">
      <v-container fill-height fluid>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <v-card
              class="mx-auto"
              max-width="550px"
              max-height="700px"
              tile
              outlined
              elevation="1"
            >
              <v-container fluid>
                <v-form ref="form" lazy-validation class="mx-6">
                  <!-- 사용자인증 -->
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
                        사용자 인증
                      </p>
                      <v-divider></v-divider>
                    </v-col>
                  </v-row>
                  <!-- input + stateMaintain -->
                  <v-row class="mt-6" justify="space-between">
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="이메일"
                        outlined
                        required
                        @keyup.enter="login()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="show ? 'text' : 'password'"
                        outlined
                        label="비밀번호"
                        required
                        @click:append="show = !show"
                        @keyup.enter="login()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="auto" class="py-0">
                      <v-checkbox
                        v-model="stateMaintain"
                        label="로그인 상태 유지하기"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="auto" class="py-0">
                      <router-link to="/find-password">
                        <p class="pt-1 text-subtitle-1 text-left">
                          비밀번호를 잊으셨나요?
                        </p>
                      </router-link>
                    </v-col>
                  </v-row>
                  <!-- 로그인 버튼 -->
                  <!-- 클릭시 axios 요청 후에 router.push 콜백으로 받아서 페이지 이동 구현 필요
                     https://router.vuejs.org/kr/guide/essentials/navigation.html
                     to -> 임시 라우팅 -->
                  <v-row>
                    <v-col cols="12" class="py-0">
                      <v-btn
                        dark
                        block
                        large
                        tile
                        elevation="1"
                        class="blue lighten-1 text-h5 font-weight-bold mt-6"
                        @click="login()"
                      >
                        로그인
                      </v-btn>
                    </v-col>
                  </v-row>
                  <!-- 회원가입하기 -->
                  <v-row class="my-9" justify="center">
                    <v-col cols="auto">
                      <p class="text-h6 font-weight-bold text-right pa-0 ma-0">
                        모주리에 처음이세요?
                      </p>
                    </v-col>
                    <v-col cols="auto">
                      <router-link to="/sign-up">
                        <p class="pt-1 text-subtitle-1 text-left pa-0 ma-0">
                          회원가입하기
                        </p>
                      </router-link>
                    </v-col>
                  </v-row>
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
  name: "UserAuthentication",
  components: {},
  data() {
    return {
      stateMaintain: false,
      email: "",
      password: "",
      show: false,
      emailRules: [(v) => !!v || "이메일을 입력해주세요."],
      passwordRules: [(v) => !!v || "패스워드를 입력해주세요"],
    };
  },
  methods: {
    async login() {
      const val = await this.$refs.form.validate();
      if (val) {
        try {
          const response = await authApi.login(
            this.email,
            this.password,
            this.stateMaintain
          );

          if (response.status === 200) {
            this.$router.push({ name: "Report" });
          }
        } catch (err) {
          if (err.response.status === 500) {
            alert(err.response.data.message);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.v-input--selection-controls {
  margin-top: 0px !important;
}
</style>
