<template>
  <v-app app>
    <AppbarLogined />
    <v-main app class="back">
      <v-container fluid>
        <v-row>
          <v-col md="3">
            <MyPageBox :style="{ top: '88px', position: 'sticky' }" />
          </v-col>
          <v-col md="9">
            <ReportCardList />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppbarLogined from "@/components/AppbarLogined.vue";
import MyPageBox from "@/components/MyPageBox.vue";
import ReportCardList from "@/components/ReportCardList.vue";
export default {
  name: "InterestIndustry",
  components: {
    AppbarLogined,
    MyPageBox,
    ReportCardList,
  },
  mounted() {
    this.callLikeData();
  },
  methods: {
    callLikeData() {
      this.$store.dispatch("list/callLikeData");
    },
  },
};
</script>

<style></style>
