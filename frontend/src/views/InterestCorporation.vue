<template>
  <v-app app>
    <AppbarLogined />
    <v-main app class="back">
      <v-layout align-content-space-around justify-center fill-height>
        <v-flex md4 sm4>
          <MyPageBox />
        </v-flex>
        <v-flex md8 sm8>
          <MyPageReport />
        </v-flex>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
import AppbarLogined from "@/components/AppbarLogined.vue";
import MyPageBox from "@/components/MyPageBox.vue";
import MyPageReport from "@/components/MyPageReport.vue";
export default {
  name: "InterestCorporation",
  components: {
    AppbarLogined,
    MyPageBox,
    MyPageReport,
  },
};
</script>

<style></style>
