<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="2">
          <v-select
            v-model="selection"
            :items="selectitem"
            solo
            menu-props="auto"
            hide-details
          ></v-select>
        </v-col>
        <!-- 검색 바 ==> autocomplete 기능 필요 -->
        <v-col cols="10">
          <v-autocomplete
            v-model="magnify"
            :items="items"
            auto-select-first
            clearable
            chips
            deletable-chips
            hide-details
            hide-selected
            label="검색"
            solo
            height="20px"
            append-icon="mdi-magnify"
            @click:append="SearchReport()"
            @keyup.enter="SearchReport()"
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
              <v-list-item-avatar>
                <v-icon>mdi-magnify</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item"> </v-list-item-title>
              </v-list-item-content>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-card width="100%" min-height="50" elevation="2">
        <template v-for="(tag, idx) in tags">
          <v-chip
            v-if="tag.selection == '종목'"
            :key="idx"
            class="ma-2"
            text-color="white"
            color="deep-orange darken-1"
            label
            close
            @click:close="remove(idx)"
            @click="clickTag(tag)"
            ><v-icon left> mdi-label </v-icon>
            <!-- removetag구현필요 -->
            {{ tag.magnify }}
          </v-chip>
          <v-chip
            v-else-if="tag.selection == '산업'"
            :key="idx"
            class="ma-2"
            text-color="white"
            color="amber darken-1"
            label
            close
            @click="clickTag(tag)"
            @click:close="remove(idx)"
          >
            <v-icon left> mdi-label </v-icon>
            <!-- removetag구현필요 -->
            {{ tag.magnify }}
          </v-chip>
          <v-chip
            v-else
            :key="idx"
            class="ma-2"
            text-color="white"
            color="lime darken-1"
            label
            close
            @click="clickTag(tag)"
            @click:close="remove(idx)"
          >
            <v-icon left> mdi-label </v-icon>
            <!-- removetag구현필요 -->
            {{ tag.magnify }}
          </v-chip>
        </template>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <v-chip-group
            v-model="chips"
            active-class="blue lighten-2 white--text"
            column
            mandatory
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
import { mapState, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      magnify: null,
      selection: "종목",
      historyList: [],
      buttonitem: ["전체", "기업", "산업", "시장"],
      selectitem: ["종목", "산업", "저자"],
      text: "",
    };
  },
  computed: {
    ...mapState("interest", ["_stocks", "_industries", "authors"]),
    ...mapState("tag", ["tags"]),
    ...mapGetters("list", { chipsfromstore: "chips" }),
    chips: {
      get() {
        return this.chipsfromstore;
      },
      set(newName) {
        return newName;
      },
    },

    items() {
      if (this.selection === "종목") {
        let a = [];
        for (var i = 0; i < this._stocks.length; i++) {
          a.push(this._stocks[i].company_name);
        }
        return a;
      } else if (this.selection === "산업") {
        let a = [];
        for (var j = 0; j < this._industries.length; j++) {
          a.push(this._industries[j].industry_type);
        }
        return a;
      } else {
        let a = [];
        for (var k = 0; k < this.authors.length; k++) {
          a.push(this.authors[k].anal_name);
        }
        return a;
      }
    },
  },
  methods: {
    clickTag(tag) {
      this.$store.commit("list/changechips", 0);
      this.selection = tag.selection;
      this.magnify = tag.magnify;
      this.$store.dispatch("list/callSearchData", {
        selection: tag.selection,
        magnify: tag.magnify,
      });
    },
    SearchReport() {
      this.$store.commit("list/changechips", 0);

      this.$store.commit("tag/InsertTags", {
        selection: this.selection,
        magnify: this.magnify,
      });
      if (this.magnify == null) {
        this.$store.dispatch("list/callData");
      } else {
        this.$store.dispatch("list/callSearchData", {
          selection: this.selection,
          magnify: this.magnify,
        });
      }
    },
    remove(idx) {
      this.$store.commit("tag/RemoveTags", idx);
    },
    showlist(i) {
      this.$store.commit("list/filter", i);
      this.$store.commit("list/changechips", i);
      this.$store.commit("list/changeIncreaseSortDone");
    },
    IncreaseSort() {
      this.$store.commit("list/IncreaseSort", this.chips);
    },
  },
};
</script>

<style scoped></style>
