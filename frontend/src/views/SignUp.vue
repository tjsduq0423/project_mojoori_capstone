<template>
  <v-app app>
    <!-- appbar -->
    <AppbarNone />
    <!-- 회원가입 컴포넌트 -->
    <v-layout align-center justify-center>
      <v-card width="550px" height="700px" tile style="border: solid">
        <v-layout column align-center>
          <p class="my-6 pt-6 display-1" style="font-weight: bold">Mojuri</p>
        </v-layout>
        <p class="ml-6 mb-6 headline" style="font-weight: bold">
          기본정보 입력
        </p>
        <v-divider class="divider mx-auto"></v-divider>
        <v-layout class="mt-6" column>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            outlined
            label="이메일(ID)"
            required
            class="mx-6"
          ></v-text-field>
          <v-text-field
            v-model="nickname"
            :counter="14"
            :rules="nameRules"
            outlined
            label="닉네임"
            required
            class="mx-6"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            outlined
            label="비밀번호"
            required
            class="mx-6"
            @click:append="show = !show"
          ></v-text-field>
        </v-layout>
        <v-layout column align-center>
          <!-- 클릭시 axios 요청 후에 router.push 콜백으로 받아서 페이지 이동 구현 필요
              https://router.vuejs.org/kr/guide/essentials/navigation.html
              to 태그는 임시 라우팅 담당.
            -->
          <v-btn
            dark
            width="250px"
            height="50px"
            class="grey lighten-1"
            to="/email-authentication"
            ><p class="pt-6 headline">가입하기</p></v-btn
          >
          <p class="pt-6 headline">이미회원이신가요?</p>
          <router-link class="" to="/user-authentication"
            >로그인하기</router-link
          >
        </v-layout>
      </v-card>
    </v-layout>
  </v-app>
</template>

<script>
import AppbarNone from "@/components/AppbarNone.vue";
export default {
  name: "SignUp",
  components: {
    AppbarNone,
  },
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
  methods: {},
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
