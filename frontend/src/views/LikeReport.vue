<template>
  <v-app app>
    <Appbar />
    <v-main app class="back">
      <v-container class="px-0 pt-0">
        <v-row justify="center">
          <v-col
            v-if="
              $vuetify.breakpoint.xl ||
              $vuetify.breakpoint.lg ||
              $vuetify.breakpoint.md
            "
            md="3"
          >
            <MyPageBox :style="{ top: '64px', position: 'sticky' }" />
          </v-col>
          <v-col md="8">
            <MyPageReportCardList />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import MyPageBox from "@/components/MyPageBox.vue";
import MyPageReportCardList from "@/components/MyPageReportCardList.vue";
import { mapState } from "vuex";
export default {
  name: "LikeReport",
  components: {
    Appbar,
    MyPageBox,
    MyPageReportCardList,
  },
  computed: {
    ...mapState("auth", ["userId"]),
  },
  mounted() {
    this.callLikeData();
  },
  methods: {
    callLikeData() {
      this.$store.dispatch("list/callLikeData", this.userId);
    },
  },
};
</script>

<style></style>
