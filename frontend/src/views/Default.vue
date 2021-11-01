<template>
  <v-app app>
    <v-app-bar color="#0D0D0D" dark app>
      <v-toolbar-title>
        <a
          href="/"
          :style="{ color: 'white', textDecoration: 'none' }"
          class="ml-2"
          >모주리
        </a>
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        v-if="$store.state.logintoken === false"
        class="ma-2 brown lighten-3"
        large
        to="/user-authentication"
      >
        로그인
        <v-icon right class="ml-3"> mdi-account </v-icon>
      </v-btn>
      <!-- 로그인버튼  비로그인 상태-->
      <v-btn
        v-if="$store.state.logintoken === true"
        icon
        class="ma-2 brown lighten-3"
      >
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <!-- 사용자 알림내용 열람용 버튼 -->
      <v-btn
        v-if="$store.state.logintoken === true"
        icon
        class="ma-2 brown lighten-3"
      >
        <v-icon> mdi-account </v-icon>
      </v-btn>
      <!-- 사용자 정보열람용 버튼 -->
    </v-app-bar>

    <v-main app> </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Default",
};
</script>
