<template>
  <v-app app>
    <AppbarNone />
    <v-layout align-center justify-center class="back">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card width="550px" height="700px" tile style="border: solid">
          <v-layout column align-center>
            <p class="my-6 pt-6 display-1" style="font-weight: bold">Mojuri</p>
          </v-layout>
          <p class="ml-6 mb-6 headline" style="font-weight: bold">
            사용자 인증
          </p>
          <v-divider class="divider mx-auto"></v-divider>
          <v-layout class="mt-6" column>
            <v-text-field
              v-model="email"
              outlined
              label="이메일"
              :rules="emailRules"
              required
              class="mx-6"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              outlined
              label="비밀번호"
              required
              :rules="passwordRules"
              class="mx-6"
              @click:append="show = !show"
            ></v-text-field>
          </v-layout>
          <v-layout align-center justify-space-between>
            <v-checkbox
              v-model="loginState"
              class="ml-8 mt-0 pt-0"
              label="로그인 상태 유지하기"
            ></v-checkbox>
            <router-link class="mr-8 mb-auto" to="/find-password"
              >비밀번호를 잊으셨나요?</router-link
            >
          </v-layout>

          <v-layout column align-center>
            <!-- 클릭시 axios 요청 후에 router.push 콜백으로 받아서 페이지 이동 구현 필요
              https://router.vuejs.org/kr/guide/essentials/navigation.html
              to -> 임시 라우팅
            -->
            <v-btn
              dark
              width="500px"
              height="50px"
              class="grey lighten-1"
              @click="validate"
              ><p class="pt-6 headline" style="font-weight: bold">
                로그인
              </p></v-btn
            >
            <p class="pt-6 headline">모주리에 처음이세요?{{ valid }}</p>
            <router-link to="/sign-up">회원가입하기</router-link>
          </v-layout>
        </v-card>
      </v-form>
    </v-layout>
  </v-app>
</template>

<script>
import AppbarNone from "@/components/AppbarNone.vue";

export default {
  name: "UserAuthentication",
  components: {
    AppbarNone,
  },
  data() {
    return {
      loginState: null,
      email: "",
      password: "",
      show: false,
      valid: true,
      emailRules: [(v) => !!v || "이메일을 입력해주세요."],
      passwordRules: [(v) => !!v || "패스워드를 입력해주세요"],
    };
  },
  methods: {
    async validate() {
      const val = await this.$refs.form.validate();
      // console.log(val); true false
      if (val) {
        this.$router.push({ name: "Logined" });
        // axios call email 로 임시비밀번호 생성 후 전송
        // then( alert 창(임시비밀번호 발송되었습니다.)
        //  --> 페이지 이동  $router.push({name :"user-authentication"}))
      }
    },
  },
};
</script>

<style>
.divider {
  border-width: 1px !important;
  border-color: black !important;
  width: 90%;
}
.v-text-field--outlined fieldset {
  border-width: 2px !important;
  color: black !important;
}
.back {
  background-color: #f2f2f2 !important;
}
</style>
