<template>
  <v-card height="400" class="mx-auto" width="70%" flat>
    <v-card-title
      class="text-h5 title"
      style="font-weight: 900; font-size: 25px !important"
    >
      {{ userid }}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-list class="py-0">
          <template v-for="(mypagebutton, index) in mypagebuttons">
            <v-list-item :key="index" link :to="mypagebutton.to">
              <v-list-item-title class="text-md-center"
                >{{ mypagebutton.content }}
              </v-list-item-title>
            </v-list-item>
            <v-divider
              v-if="index < mypagebuttons.length - 1"
              :key="`${index} - divider`"
            ></v-divider>
          </template>
        </v-list>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "BoardBox",
  data() {
    return {
      userid: "문준호",
      mypagebuttons: [
        {
          content: "내가 쓴 글",
          to: "/my-board",
        },
        {
          content: "북마크",
          to: "/bookmark",
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
