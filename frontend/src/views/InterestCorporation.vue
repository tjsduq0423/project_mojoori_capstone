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
            <v-card width="100%" min-height="50" tile elevation="1">
              <template v-for="(tag, i) in tags">
                <v-chip
                  :key="i"
                  class="ma-2"
                  text-color="white"
                  color="deep-orange darken-1"
                  label
                  close
                  @click:close="removeTag(i)"
                >
                  {{ tag.company_name }}
                </v-chip>
              </template>
            </v-card>
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
import * as interestApi from "@/api/interest";

export default {
  name: "InterestCorporation",
  components: {
    Appbar,
    MyPageBox,
    MyPageReportCardList,
  },
  data() {
    return {
      tags: [],
    };
  },
  computed: {
    ...mapState("auth", ["userId"]),
  },
  mounted() {
    this.callStockTags();
  },
  methods: {
    async removeTag(index) {
      try {
        const response = await interestApi.deleteInterestStocks(
          this.userId,
          this.tags[index].company_name
        );
        if (response.status === 200) {
          this.callStockTags();
          //this.tags.splice(index, 1);
        }
      } catch (err) {
        if (err.response.staus === 500) {
          console.log(err.response.data.message);
        }
      }
    },
    async callStockTags() {
      try {
        const response = await interestApi.getInterestStocks(this.userId);

        if (response.status === 200) {
          this.tags = response.data.rows2;
          this.$store.dispatch("list/callInterestCorporationData", this.tags);
        }
      } catch (err) {
        if (err.reponse.status === 500) {
          console.log(err.response.data.message);
        }
      }
    },
  },
};
</script>

<style></style>
