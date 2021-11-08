<template>
  <v-app app>
    <AppbarNone />

    <v-layout align-center justify-center class="back">
      <v-card width="550px" height="700px" tile style="border: solid">
        <v-layout column align-center>
          <p class="my-6 pt-6 display-1" style="font-weight: bold">Mojuri</p>
        </v-layout>
        <p class="ml-6 mb-6 headline" style="font-weight: bold">
          이메일 인증 안내
        </p>
        <v-divider class="divider mx-auto"></v-divider>
        <v-layout class="mt-6" column>
          <p class="mx-7 mb-2 subheading">인증메일이 발송되었습니다.</p>
          <p class="ml-7 mr-16 pr-16 mb-6 body-2" style="color: #bdbdbd">
            메일을 30분 이내에 확인한 후 인증 링크를 클릭해야 회원가입을 완료할
            수 있습니다.
          </p>
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
            to="/default"
            ><p class="pt-6 headline" style="font-weight: bold">
              홈으로
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
  name: "EmailAuthentication",
  components: {
    AppbarNone,
  },
};
</script>

<style></style>
