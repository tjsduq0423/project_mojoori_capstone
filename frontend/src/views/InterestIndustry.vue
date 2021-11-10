<template>
  <v-app app>
    <AppbarLogined />
    <v-main app class="back">
      <v-layout align-content-space-around justify-center fill-height mt-8>
        <v-flex md3 sm3>
          <MyPageBox />
        </v-flex>
        <v-flex md9 sm9 mr-16>
          <MyPageIIReport />
        </v-flex>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
import AppbarLogined from "@/components/AppbarLogined.vue";
import MyPageBox from "@/components/MyPageBox.vue";
import MyPageIIReport from "@/components/MyPageIIReport.vue";
export default {
  name: "InterestIndustry",
  components: {
    AppbarLogined,
    MyPageBox,
    MyPageIIReport,
  },
};
</script>

<style></style>
