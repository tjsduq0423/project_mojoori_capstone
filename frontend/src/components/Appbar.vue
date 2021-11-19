<template>
  <v-app-bar color="#64ffda" app>
    <!-- 툴바 제목 Mojuri -->
    <v-toolbar-title>
      <router-link
        to="/"
        :style="{
          color: 'black',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '2em',
        }"
        class="ml-2"
        >Mojuri
      </router-link>
    </v-toolbar-title>

    <v-spacer />
    <!-- practice 바로가기 버튼 -->
    <v-btn
      class="ma-2"
      rounded
      text
      :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
      large
      to="/practice"
    >
      게시판
      <v-icon large right class="ml-3"> mdi-clipboard-edit-outline </v-icon>
    </v-btn>
    <!-- 게시판 바로가기 버튼 -->
    <v-btn
      class="ma-2"
      color="#64ffda"
      rounded
      dark
      :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
      large
      to="/board"
    >
      게시판
      <v-icon large right class="ml-3"> mdi-clipboard-edit-outline </v-icon>
    </v-btn>
    <!-- 회원가입버튼 -->
    <v-btn
      class="ma-2"
      text
      large
      to="/sign-up"
      :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
    >
      회원가입
    </v-btn>
    <!-- 로그인버튼 -->
    <v-btn
      class="ma-2"
      text
      large
      to="/user-authentication"
      :style="{ fontColor: '#64ffda', fontSize: '1.25em', fontWeight: 'bold' }"
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
