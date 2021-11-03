<template>
  <v-app-bar color="#0D0D0D" dark app>
    <!-- 툴바 제목 Mojuri -->
    <v-toolbar-title>
      <router-link
        to="/"
        :style="{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.5em',
        }"
        class="ml-2"
        >Mojuri
      </router-link>
    </v-toolbar-title>

    <v-spacer />
    <!-- 게시판 바로가기 버튼 -->
    <v-btn
      class="ma-2 grey lighten-1"
      :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
      large
      to="/board"
    >
      게시판
      <v-icon large right class="ml-3"> mdi-clipboard-edit-outline </v-icon>
    </v-btn>
    <!-- 사용자 알림내용 열람용 버튼 -->
    <v-btn icon class="ma-2 grey lighten-1" to="/user-authentication">
      <v-icon large>mdi-bell-outline</v-icon>
    </v-btn>
    <!-- 회원가입버튼 -->
    <v-btn
      class="ma-2 grey lighten-1"
      large
      to="/sign-up"
      :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
    >
      회원가입
    </v-btn>
    <!-- 로그인버튼 -->
    <v-btn
      class="ma-2 grey lighten-1"
      large
      to="/user-authentication"
      :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
    >
      로그인
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Appbar",
  data() {
    return {};
  },
};
</script>

<style></style>
