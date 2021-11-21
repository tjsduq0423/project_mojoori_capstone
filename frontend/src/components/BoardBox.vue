<template>
  <v-card
    height="400"
    max-width="300px"
    width="100%"
    class="mx-auto"
    tile
    elevation="1"
  >
    <v-card-title
      v-if="$store.state.auth.auth"
      class="text-h5 title pl-7 pt-6"
      style="font-weight: 900; font-size: 25px !important"
    >
      {{ $store.state.auth.nickname }}
    </v-card-title>

    <v-list class="py-0">
      <template v-for="(mypagebutton, index) in mypagebuttons">
        <v-list-item :key="index" link :to="mypagebutton.to">
          <v-list-item-title class="text-center"
            >{{ mypagebutton.content }}
          </v-list-item-title>
        </v-list-item>
        <v-divider
          v-if="index < mypagebuttons.length - 1"
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
      mypagebuttons: [
        {
          content: "내가 쓴 글",
          to: "/my-board",
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
