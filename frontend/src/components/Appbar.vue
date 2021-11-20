<template>
  <v-app-bar app outlined flat color="blue darken-1" dark>
    <!-- 툴바 제목 Mojuri -->
    <v-toolbar-title>
      <router-link
        to="/"
        :style="{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '2em',
        }"
        class="ml-2"
        >Mojuri
      </router-link>
    </v-toolbar-title>

    <v-spacer />

    <!-- 알림 목록 -->
    <v-menu v-if="this.$store.state.auth.auth" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn large icon class="mx-1" v-bind="attrs" v-on="on">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </template>
      <v-list class="py-0">
        <template v-for="(item, index) in items">
          <v-list-item :key="index">
            <v-list-item-title
              >{{ item.content }} {{ item.period }}일전
            </v-list-item-title>
          </v-list-item>
          <v-divider
            v-if="index < items.length - 1"
            :key="`${index} - divider`"
          ></v-divider>
        </template>
      </v-list>
    </v-menu>

    <!-- 게시판 버튼 -->
    <v-tooltip bottom color="blue darken-1">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-1" large icon to="/board" v-bind="attrs" v-on="on">
          <v-icon>mdi-clipboard-edit-outline </v-icon>
        </v-btn>
      </template>
      <!-- :style="{ backgroundColor: 'white' }" -->
      <span>게시판</span>
    </v-tooltip>

    <!-- 로그인버튼 -->
    <v-tooltip v-if="!this.$store.state.auth.auth" bottom color="blue darken-1">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-1"
          large
          icon
          to="/user-authentication"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon> mdi-login </v-icon>
        </v-btn>
      </template>
      <!-- :style="{ backgroundColor: 'white' }" -->
      <span>로그인</span>
    </v-tooltip>

    <!-- 설정버튼 -->
    <v-tooltip v-if="this.$store.state.auth.auth" bottom color="blue darken-1">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-1" large icon v-bind="attrs" v-on="on">
          <v-icon> mdi-pin-outline </v-icon>
        </v-btn>
      </template>
      <!-- :style="{ backgroundColor: 'white' }" -->
      <span>골라보기</span>
    </v-tooltip>

    <!-- 설정버튼 -->
    <v-tooltip v-if="this.$store.state.auth.auth" bottom color="blue darken-1">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-1" large icon v-bind="attrs" v-on="on">
          <v-icon> mdi-account-outline </v-icon>
        </v-btn>
      </template>
      <!-- :style="{ backgroundColor: 'white' }" -->
      <span>내 정보</span>
    </v-tooltip>

    <!-- 로그인버튼 -->
    <v-tooltip v-if="this.$store.state.auth.auth" bottom color="blue darken-1">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-1"
          large
          icon
          v-bind="attrs"
          @click="logout()"
          v-on="on"
        >
          <v-icon> mdi-logout </v-icon>
        </v-btn>
      </template>
      <!-- :style="{ backgroundColor: 'white' }" -->
      <span>로그아웃</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import * as authApi from "@/api/auth";
// import * as interestApi from "@/api/interest";
// import { mapState } from "vuex";

export default {
  name: "Appbar",
  data() {
    return {
      items: null,
    };
  },
  created() {
    this.items = [
      { content: "삼성전자 리포트가 업로드 되었습니다.", period: 3 },
      { content: "삼성전자 리포트가 업로드 되었습니다.", period: 2 },
      { content: "삼성전자 리포트가 업로드 되었습니다.", period: 1 },
      { content: "삼성전자 리포트가 업로드 되었습니다.", period: 1 },
      { content: "삼성전자 리포트가 업로드 되었습니다.", period: 2 },
      { content: "삼성전자 리포트가 업로드 되었습니다.", period: 3 },
    ];
  },
  methods: {
    async logout() {
      try {
        const response = await authApi.logout();
        if (response.status === 200) {
          console.log(response.data.message);
          this.$router.push({ name: "Home" });
        }
      } catch (err) {
        console.log("로그아웃 실패");
      }
    },
  },
};
</script>

<style scoped></style>
