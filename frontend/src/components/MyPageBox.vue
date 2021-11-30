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
    <v-divider></v-divider>
    <v-list class="py-0">
      <template v-for="(item, index) in items">
        <v-list-item :key="index" class="" link :to="item.to">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-center"
            >{{ item.content }}
          </v-list-item-title>
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
  name: "MyPageBox",
  data() {
    return {
      items: [
        {
          content: "관심 종목",
          icon: "mdi-domain",
          to: "/interest-corporation",
        },
        {
          content: "관심 산업",
          icon: "mdi-factory",
          to: "/interest-industry",
        },
        {
          content: "찜한 리포트",
          icon: "mdi-bookmark-outline",
          to: "/like-report",
        },
        {
          content: "비밀번호 변경",
          icon: "mdi-lock-open-plus-outline",
          to: "/change-password",
        },
      ],
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
