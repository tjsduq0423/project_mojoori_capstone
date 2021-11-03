<template>
  <v-app app>
    <AppbarNone />

    <v-layout align-center justify-center>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card width="550px" height="700px" tile style="border: solid">
          <v-layout column align-center>
            <p class="my-6 pt-6 display-1" style="font-weight: bold">Mojuri</p>
          </v-layout>
          <p class="ml-6 mb-6 headline" style="font-weight: bold">
            비밀번호 찾기
          </p>
          <v-divider class="divider mx-auto"></v-divider>
          <v-layout class="mt-6" column>
            <p class="mx-7 mb-6 subheading">
              비밀번호를 찾고자 하는 이메일 ID를 입력해 주시면 해당 메일 주소로
              비밀번호 임시비밀번호를 보내드립니다.
            </p>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              outlined
              label="이메일"
              required
              class="mx-6"
            ></v-text-field>
          </v-layout>

          <v-layout column align-center>
            <!-- 클릭시 axios 요청 후에 router.push 콜백으로 받아서 페이지 이동 구현 필요
              https://router.vuejs.org/kr/guide/essentials/navigation.html
            -->
            <v-btn
              dark
              width="250px"
              height="50px"
              class="grey lighten-1"
              @click="validate"
              ><p class="pt-6 headline" style="font-weight: bold">
                임시 비밀번호 전송
              </p></v-btn
            >
            <router-link class="mt-6" to="/user-authentication"
              >로그인으로 돌아가기
            </router-link>
          </v-layout>
        </v-card>
      </v-form>
    </v-layout>
  </v-app>
</template>

<script>
import AppbarNone from "@/components/AppbarNone.vue";

export default {
  name: "FindPassword",
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
      emailRules: [
        (v) => !!v || "이메일 입력은 필수입니다.",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "올바른 이메일을 입력해주세요",
      ],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
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
</style>
