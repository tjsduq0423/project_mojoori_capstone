<template>
  <v-app app>
    <AppbarNone />

    <v-layout align-center justify-center>
      <v-card width="550px" height="700px" tile style="border: solid">
        <v-layout column align-center>
          <p class="my-6 pt-6 display-1" style="font-weight: bold">Mojuri</p>
        </v-layout>
        <p class="ml-6 mb-6 headline" style="font-weight: bold">사용자 인증</p>
        <v-divider class="divider mx-auto"></v-divider>
        <v-layout class="mt-6" column>
          <v-text-field
            v-model="email"
            outlined
            label="이메일"
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
            to="/Logined"
            ><p class="pt-6 headline" style="font-weight: bold">
              로그인
            </p></v-btn
          >
          <p class="pt-6 headline">모주리에 처음이세요?</p>
          <router-link to="/sign-up">회원가입하기</router-link>
        </v-layout>
      </v-card>
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
    return { loginState: null, email: "", password: "", show: false };
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
