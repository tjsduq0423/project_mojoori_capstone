<template>
  <v-app app>
    <AppbarNone />

    <v-layout align-center justify-center class="back">
      <v-card width="550px" height="700px" tile style="border: solid">
        <v-layout column align-center>
          <p class="my-6 pt-6 display-1" style="font-weight: bold">Mojuri</p>
        </v-layout>
        <p class="ml-6 mb-6 headline" style="font-weight: bold">인증 완료</p>
        <v-divider class="divider mx-auto"></v-divider>
        <v-layout class="mt-6" column>
          <p class="mx-7 mb-2 subheading">메일 인증이 완료되었습니다.</p>
        </v-layout>

        <v-layout column align-center>
          <!-- 클릭시 axios 요청 후에 router.push 콜백으로 받아서 페이지 이동 구현 필요
              https://router.vuejs.org/kr/guide/essentials/navigation.html
            -->
          <v-btn
            dark
            width="250px"
            height="50px"
            class="grey lighten-1 mt-16"
            to="/user-authentication"
            ><p class="pt-6 headline" style="font-weight: bold">
              로그인
            </p></v-btn
          >
        </v-layout>
      </v-card>
    </v-layout>
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
