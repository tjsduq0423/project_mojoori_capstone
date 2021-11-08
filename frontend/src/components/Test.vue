<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="white" v-bind="attrs" v-on="on"> 관심종목설정 </v-btn>
      </template>

      <v-card>
        <v-card-title class="justify-center text-h4 teal accent-2">
          관심종목설정
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="pt-0">
              <template v-for="(item, i) in historystocks.slice(0, 5)">
                <v-checkbox
                  :key="i"
                  v-model="selectedstocks"
                  hide-details
                  :value="item"
                  :label="item"
                />
              </template>
            </v-col>
            <v-col class="pt-0">
              <template v-for="(item, i) in historystocks.slice(5, 10)">
                <v-checkbox
                  :key="i"
                  v-model="selectedstocks"
                  hide-details
                  :value="item"
                  :label="item"
                />
              </template>
            </v-col>
            <v-col class="pt-0">
              <template v-for="(item, i) in historystocks.slice(10, 15)">
                <v-checkbox
                  :key="i"
                  v-model="selectedstocks"
                  hide-details
                  :value="item"
                  :label="item"
                />
              </template>
            </v-col>
            <v-col class="pt-0">
              <template v-for="(item, i) in historystocks.slice(15, 20)">
                <v-checkbox
                  :key="i"
                  v-model="selectedstocks"
                  hide-details
                  :value="item"
                  :label="item"
                />
              </template>
            </v-col>
            <v-col class="pt-0">
              <template v-for="(item, i) in historystocks.slice(20, 25)">
                <v-checkbox
                  :key="i"
                  v-model="selectedstocks"
                  hide-details
                  :value="item"
                  :label="item"
                />
              </template>
            </v-col>
          </v-row>
          <v-pagination
            v-model="page"
            class="pagination mb-2"
            :length="pages"
            circle
            @input="updatePage"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false"> 확인 </v-btn>
        </v-card-actions>

        page : {{ page }} <br />
        pageSize : {{ pageSize }} <br />
        listCount : {{ listCount }} <br />
        selectedstocks : {{ selectedstocks }} <br />
        historystocks : {{ historystocks }} <br />
        stocks : {{ stocks }} <br />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Advertise",
  data() {
    return {
      page: 1,
      pageSize: 25,
      listCount: 0,
      dialog: false,
      stocks: [
        "삼성전자",
        "엘지디스플레이",
        "화학",
        "삼성전자1",
        "엘지디스플레이1",
        "화학1",
        "삼성전자2",
        "엘지디스플레이2",
        "화학2",
        "삼성전자3",
        "엘지디스플레이3",
        "화학4",
        "삼성전자4",
        "엘지디스플레이4",
        "화학5",
        "삼성전자5",
        "엘지디스플레이5",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "q",
        "ab",
        "abbb",
        "accc",
        "ac",
        "at",
        "ay",
        "au",
        "ai",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "q",
        "ab",
        "abbb",
        "accc",
        "ac",
        "at",
        "ay",
        "au",
        "ai",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "q",
        "ab",
        "abbb",
        "accc",
        "ac",
        "at",
        "ay",
        "au",
        "ai",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "q",
        "ab",
        "abbb",
        "accc",
        "ac",
        "at",
        "ay",
        "au",
        "ai",
      ],
      selectedstocks: [],
      historystocks: [],
    };
  },
  computed: {
    pages() {
      let _this = this;
      if (_this.pageSize == null || _this.listCount == null) return 0;
      return Math.ceil(_this.listCount / _this.pageSize);
    },
  },
  created() {
    let _this = this;
    _this.initPage();
    _this.updatePage(_this.page);
  },
  methods: {
    initPage: function () {
      let _this = this;
      _this.listCount = _this.stocks.length;
      if (_this.listCount < _this.pageSize) {
        _this.historystocks = _this.stocks;
      } else {
        _this.historystocks = _this.stocks.slice(0, _this.pageSize);
      }
    },
    updatePage: function (pageIndex) {
      let _this = this;
      let _start = (pageIndex - 1) * _this.pageSize;
      let _end = pageIndex * _this.pageSize;
      _this.historystocks = _this.stocks.slice(_start, _end);
      _this.selectedstocks = this.selectedstocks;
    },
  },
};
</script>

<style></style>
