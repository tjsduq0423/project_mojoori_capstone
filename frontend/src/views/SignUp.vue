<template>
  <v-app app>
    <!-- 회원가입 컴포넌트 -->
    <v-main class="back">
      <v-container fill-height fluid>
        <v-row justify="center">
          <v-col cols="12" md="5">
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
                  <!-- 기본정보입력 -->
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
                        기본정보 입력
                      </p>
                      <v-divider class="divider"></v-divider>
                    </v-col>
                  </v-row>
                  <!-- input -->
                  <v-row class="mt-6">
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        outlined
                        label="이메일(ID)"
                        required
                        @keyup.enter="signUp()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="nickname"
                        :counter="14"
                        :rules="nameRules"
                        outlined
                        required
                        label="닉네임"
                        @keyup.enter="signUp()"
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
                        @keyup.enter="signUp()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- 가입하기 버튼 -->
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-btn
                        dark
                        block
                        large
                        tile
                        elevation="1"
                        class="blue lighten-1 text-h5 font-weight-bold"
                        @click="signUp()"
                      >
                        가입하기
                      </v-btn>
                    </v-col>
                  </v-row>
                  <!-- 로그인하기 -->
                  <v-row class="my-6">
                    <v-col cols="7">
                      <p class="text-h6 font-weight-bold text-right">
                        이미회원이신가요?
                      </p>
                    </v-col>
                    <v-col cols="5">
                      <router-link to="/user-authentication">
                        <p class="pt-1 text-subtitle-1 text-left">로그인하기</p>
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
  name: "SignUp",
  components: {},
  data() {
    return {
      email: "",
      nickname: "",
      password: "",
      show: false,
      emailRules: [
        (v) => !!v || "이메일 입력은 필수입니다.",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "올바른 이메일을 입력해주세요",
      ],
      nameRules: [
        (v) => !!v || "닉네임입력은 필수입니다.",
        (v) => (v && v.length <= 14) || "닉네임은 14 이내로 입력해주세요",
      ],
      passwordRules: [
        (v) => !!v || "비밀번호 입력은 필수입니다.",
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,14}$/.test(
            v
          ) || "비밀번호 조건 : 최소 8자, 최대 14자, 특수문자, 숫자, 문자",
      ],
    };
  },
  methods: {
    async signUp() {
      const val = await this.$refs.form.validate();
      if (val) {
        try {
          const response = await authApi.signUp(
            this.email,
            this.password,
            this.nickname
          );

          if (response.status === 200) {
            this.$router.push({ name: "EmailAuthentication" });
          }
        } catch (err) {
          alert(err.response.data.message);
        }
      }
    },
  },
};
</script>

<style></style>
