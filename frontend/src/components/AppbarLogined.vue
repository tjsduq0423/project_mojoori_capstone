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
      to="/board-logined"
    >
      게시판
      <v-icon large right class="ml-3"> mdi-clipboard-edit-outline </v-icon>
    </v-btn>
    <!-- 사용자 알림내용 열람용 버튼 -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon class="ma-2 grey lighten-1" v-bind="attrs" v-on="on">
          <v-badge color="green" :content="items.length">
            <v-icon large>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list>
        <v-divider></v-divider>
        <v-list-item v-for="(item, index) in items" :key="index" link>
          <v-list-item-title
            >{{ item.content }} {{ item.period }}일전</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn icon class="ma-2 grey lighten-1">
      <v-icon large>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppbarLogined",
  data() {
    return {
      items: [
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 3 },
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 2 },
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 1 },
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 1 },
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 2 },
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 3 },
      ],
    };
  },
};
</script>

<style></style>
