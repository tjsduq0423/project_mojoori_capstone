<template>
  <v-container class="mx-auto mb-auto">
    <v-row>
      <v-col cols="12">
        <!-- 검색 태그들 by 칩+ 카드 -->
        <v-card height="50">
          <v-chip
            v-for="(tag, i) in searchHistory"
            :key="i"
            class="ma-2"
            text-color="white"
            color="deep-orange darken-1"
            label
            close
            @click:close="removeList(i)"
          >
            {{ tag }}
          </v-chip>
        </v-card>
      </v-col>

      <v-col cols="12" class="mt-3"> </v-col>
    </v-row>
    <!-- 카드 리스트  수정 필요함 -->
    <v-card
      v-for="(item, index) in historyList"
      :key="index"
      :search="search"
      class="mx-auto grey lighten-3"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-left">
            <v-chip
              class="mr-2"
              label
              text-color="white"
              color="deep-orange darken-1"
            >
              {{ item.name }}
            </v-chip>
            <v-chip
              v-for="(tags, index2) in item.tag"
              :key="index2"
              class="ma-2"
              label
              text-color="white"
              color="grey darken-2"
            >
              {{ tags }}
            </v-chip>
          </div>
          <v-list-item-title class="text-left headline">
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-left subtitle">
            {{ item.writer }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-card-actions>
          <v-btn class="mx-2" fab icon>
            <v-icon dark large> mdi-open-in-new </v-icon>
          </v-btn>
          <v-btn
            v-if="item.likes == false"
            class="mx-2"
            fab
            icon
            @click="LikeOn((page - 1) * 5 + index)"
          >
            <v-icon dark color="pink" large> mdi-heart-outline </v-icon>
          </v-btn>
          <v-btn
            v-else
            class="mx-2"
            fab
            icon
            @click="LikeOff((page - 1) * pageSize + index)"
          >
            <v-icon dark color="pink"> mdi-heart </v-icon>
          </v-btn>
        </v-card-actions>
      </v-list-item>
    </v-card>

    <v-pagination
      v-model="page"
      class="pagination mt-3"
      :length="pages"
      circle
      @input="updatePage"
    />
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      search: "",
      magnify: "",

      page: 1,
      pageSize: 5,
      listCount: 0,
      selection: "",
      historyList: [],
      searchHistory: ["에코프로", "JYP엔터", "큐브엔터"],
    };
  },
  computed: {
    ...mapState("list", {
      list: (state) => state.list,
    }),
    pages() {
      if (this.pageSize == null || this.listCount == null) return 0;
      return Math.ceil(this.listCount / this.pageSize);
    },
  },
  created() {
    this.initPage();
    this.updatePage(this.page);
  },
  methods: {
    ...mapMutations("list", ["LikeOn", "LikeOff"]),
    initPage: function () {
      this.listCount = this.list.length;
      if (this.listCount < this.pageSize) {
        this.historyList = this.list;
      } else {
        this.historyList = this.list.slice(0, this.pageSize);
      }
    },
    updatePage: function (pageIndex) {
      let _start = (pageIndex - 1) * this.pageSize;
      let _end = pageIndex * this.pageSize;
      this.historyList = this.list.slice(_start, _end);
      this.page = pageIndex;
    },
    removeList: function (i) {
      this.searchHistory.splice(i, 1);
    },
    nothing() {
      console.log(this.magnify);
    },
  },
};
</script>

<style scoped>
.searchbar {
  border-radius: 20px !important;
  border-color: black !important;
  border: solid 1em;
  border-width: medium !important;
}
.v-text-field--outlined fieldset {
  border-width: 4px !important;
  color: black !important;
}
.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
</style>
