<template>
  <v-card
    min-height="400"
    max-width="300px"
    width="100%"
    class="mx-auto"
    tile
    elevation="1"
  >
    <v-card-title
      v-if="$store.state.auth.auth"
      class="text-h6 pl-7 pt-6 font-weight-bold"
    >
      {{ $store.state.auth.userId }}
    </v-card-title>
    <v-card-subtitle v-if="$store.state.auth.auth" class="text-subtitle-1 pl-7">
      {{ $store.state.auth.nickname }}
    </v-card-subtitle>
    <v-row v-if="$store.state.auth.auth" justify="space-around" class="mb-1">
      <v-col cols="auto">
        <v-btn
          outlined
          large
          color="#6ce422"
          class="px-0"
          width="90px"
          @click="$router.push({ path: '/my-board' }).catch(() => {})"
        >
          내가 쓴 글
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          large
          outlined
          color="#6ce422"
          class="px-0"
          width="90px"
          @click="$router.push({ path: '/board-write' }).catch(() => {})"
        >
          글쓰기
        </v-btn>
      </v-col>
    </v-row>
    <v-btn
      v-if="!$store.state.auth.auth"
      large
      color="#6ce422"
      elevation="0"
      dark
      tile
      to="/user-authentication"
      class="font-weight-black text-h6"
      block
    >
      로그인
    </v-btn>
    <v-divider></v-divider>

    <v-list class="py-0">
      <v-subheader>홈</v-subheader>
      <v-list-item-group>
        <v-list-item :to="home.to">
          <v-list-item-icon>
            <v-icon v-text="home.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="home.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>

    <v-list class="py-0">
      <v-subheader>분류</v-subheader>
      <template v-for="(item, index) in items">
        <v-list-item :key="index" link :to="item.to">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }} </v-list-item-title>
        </v-list-item>
        <v-divider
          v-if="index < items.length - 1"
          :key="`${index} - divider`"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "BoardBox",
  data() {
    return {
      items: [
        { text: "종목", icon: "mdi-domain", to: "/board/stock" },
        { text: "이슈", icon: "mdi-bomb", to: "/board/issue" },
        { text: "자유", icon: "mdi-account-group", to: "/board/freedom" },
        { text: "유머", icon: "mdi-emoticon-excited", to: "/board/humor" },
        { text: "팁과 노하우", icon: "mdi-book-alphabet", to: "/board/tip" },
      ],
      home: {
        text: "게시판",
        icon: "mdi-home",
        to: "/board/home",
      },
    };
  },
};
</script>

<style scoped>
.v-list-item__title {
  font-size: 1.2rem !important;
  font-weight: bold;
}
</style>
