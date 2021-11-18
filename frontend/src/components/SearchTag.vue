<template>
  <!-- 검색 태그들 by 칩+ 카드 -->
  <v-card min-height="50" flat>
    <template v-for="(tag, i) in stockstags">
      <v-chip
        v-if="corporation == true"
        :key="i"
        class="ma-2"
        text-color="white"
        color="deep-orange darken-1"
        label
        close
        @click:close="removestockstag(tag)"
      >
        <!-- removetag구현필요 -->
        {{ tag }}
      </v-chip>
    </template>
    <template v-for="(tag, idx) in industriestags">
      <v-chip
        v-if="industry == true"
        :key="`industry - ${idx}`"
        class="ma-2"
        text-color="white"
        color="grey darken-2"
        label
        close
        @click:close="removeindustriestag(tag)"
      >
        <!-- removetag구현필요 -->
        {{ tag }}
      </v-chip>
    </template>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import * as interestApi from "@/api/interest";
export default {
  props: {
    industry: Boolean,
    corporation: Boolean,
  },
  data() {
    return {
      stockstags: [],
      industriestags: [],
    };
  },
  computed: {
    ...mapState("auth", ["userId"]),
  },
  mounted() {
    this.callstockstag();
    this.callindustriestag();
  },
  methods: {
    async callstockstag() {
      try {
        const response = await interestApi.getinterestStocks(this.userId);
        if (response.status === 200) {
          console.log(response.data.stockstags);
          this.stockstags = response.data.stockstags;
        }
      } catch (err) {
        if (err.response.status === 401) {
          console.log(err.response.data.message);
        }
      }
    },
    async callindustriestag() {
      try {
        const response = await interestApi.getinterestIndustries(this.userId);
        if (response.status === 200) {
          console.log(response.data.industriestags);
          this.industriestags = response.data.industriestags;
        }
      } catch (err) {
        if (err.response.status === 401) {
          console.log(err.response.data.message);
        }
      }
    },
    removestockstag(tag) {
      console.log(tag);
    },
    removeindustriestag(tag) {
      console.log(tag);
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined fieldset {
  border-width: 4px !important;
  color: black !important;
}
.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: col cols= "12" !important;
  align-items: center !important;
}
</style>
