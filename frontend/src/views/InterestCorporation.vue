<template>
  <v-app app>
    <AppbarLogined />
    <v-main app class="back">
      <v-container fluid>
        <v-layout align-content-space-around justify-center fill-height mt-8>
          <v-flex md3 sm3>
            <MyPageBox :style="{ top: '88px', position: 'sticky' }" />
          </v-flex>
          <v-flex md9 sm9 mr-16>
            <SearchTag />
            <ReportCardList />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppbarLogined from "@/components/AppbarLogined.vue";
import MyPageBox from "@/components/MyPageBox.vue";
import SearchTag from "@/components/SearchTag.vue";
import ReportCardList from "@/components/ReportCardList.vue";
export default {
  name: "InterestCorporation",
  components: {
    AppbarLogined,
    MyPageBox,
    SearchTag,
    ReportCardList,
  },
};
</script>

<style></style>
