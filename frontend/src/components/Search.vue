<template>
  <v-row>
    <v-col cols="12">
      <!-- 검색 바 ==> autocomplete 기능 필요 -->
      <v-autocomplete
        v-model="magnify"
        :items="items"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        label="Search"
        solo
        append-icon="mdi-magnify"
        @click:append="SearchReport()"
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title> 검색 결과가 없습니다. </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
          <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue darken-1"
            class="white--text"
            label
            v-on="on"
          >
            <v-icon left> mdi-label </v-icon>
            <span v-text="item"></span>
          </v-chip>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-content>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="12">
      <v-card width="100%" min-height="50" tile elevation="1">
        <template v-for="(tag, idx) in tags">
          <v-chip
            :key="idx"
            class="ma-2"
            text-color="white"
            color="blue darken-1"
            label
            close
            @click:close="remove(idx)"
          >
            <!-- removetag구현필요 -->
            {{ tag }}
          </v-chip>
        </template>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <v-chip-group
            v-model="selection"
            active-class="blue lighten-2 white--text"
            column
          >
            <v-chip
              v-for="(button, i) in buttonitem"
              :key="i"
              label
              :style="{ fontSize: '18px', fontWeight: 'bold' }"
              class="white px-6 py-5 mr-6"
              @click="showlist(i)"
            >
              {{ button }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="auto">
          <v-tooltip top color="blue lighten-1">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                large
                class="red--text mt-auto px-3"
                text
                :style="{ fontSize: '18px', fontWeight: 'bold' }"
                v-bind="attrs"
                v-on="on"
                @click="IncreaseSort()"
              >
                <v-icon class="pr-2"> mdi-arrow-up-bold-box </v-icon>
                상승여력 기준 정렬
              </v-btn>
            </template>
            <!-- :style="{ backgroundColor: 'white' }" -->
            <span>상승여력 = 종목리포트 목표주가 - 현재 주가</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      magnify: null,
      selection: 0,
      historyList: [],
      tags: [],
      buttonitem: ["전체", "기업", "산업", "시장"],
    };
  },
  computed: {
    ...mapState("interest", ["_stocks", "_industries"]),
    items() {
      let a = [];
      for (var i = 0; i < this._stocks.length; i++) {
        a.push(this._stocks[i].company_name);
      }
      for (var j = 0; j < this._industries.length; j++) {
        a.push(this._industries[j].industry_type);
      }
      return a;
    },
  },
  methods: {
    SearchReport() {
      if (this.magnify != null && !this.tags.includes(this.magnify)) {
        if (this.tags.length < 5) {
          this.tags.unshift(this.magnify);
        } else {
          this.tags.pop();
          this.tags.unshift(this.magnify);
        }
      }
    },
    remove(idx) {
      this.tags.splice(idx, 1);
    },
    showlist(i) {
      console.log(i);
      if (i == 0) {
        this.$store.dispatch("list/callData");
      }
      if (i == 1) {
        this.$store.dispatch("list/callCorporationData");
      }
      if (i == 2) {
        this.$store.dispatch("list/callIndustryData");
      }
      if (i == 3) {
        this.$store.dispatch("list/callMarketData");
      }
    },
    IncreaseSort() {
      this.$store.commit("list/IncreaseSort");
    },
  },
};
</script>

<style></style>
