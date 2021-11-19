<template>
  <v-app-bar app outlined flat color="blue darken-1">
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

    <!-- 게시판 버튼 -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-1" large icon to="/board" v-bind="attrs" v-on="on">
          <v-icon>mdi-clipboard-edit-outline </v-icon>
        </v-btn>
      </template>
      <!-- :style="{ backgroundColor: 'white' }" -->
      <span>게시판</span>
    </v-tooltip>

    <!-- 로그인버튼 -->
    <v-tooltip v-if="!this.$store.state.auth.auth" bottom>
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

    <v-menu v-if="!this.$store.state.auth.auth" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn large icon class="mx-1" v-bind="attrs" v-on="on">
          <v-badge color="green" :content="items.length">
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
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
  </v-app-bar>
</template>

<script>
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
};
</script>

<style></style>
