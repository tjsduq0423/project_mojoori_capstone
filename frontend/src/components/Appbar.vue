<template>
  <v-app-bar app outlined flat color="light-blue accent-1" dark>
    <!-- 툴바 제목 Mojuri -->
    <v-toolbar-title>
      <router-link
        to="/"
        :style="{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '2em',
        }"
        class="ml-2"
        >Mojuri
      </router-link>
    </v-toolbar-title>

    <v-spacer />

    <!-- 게시판 버튼 -->
    <v-tooltip bottom color="blue darken-1">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-1"
          large
          icon
          to="/board/home"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-clipboard-edit-outline </v-icon>
        </v-btn>
      </template>
      <span>게시판</span>
    </v-tooltip>

    <!-- 로그인버튼 -->
    <v-tooltip v-if="!this.$store.state.auth.auth" bottom color="blue darken-1">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-1"
          large
          icon
          to="/user-authentication"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon> mdi-login </v-icon>
        </v-btn>
      </template>
      <span>로그인</span>
    </v-tooltip>

    <!-- 관심설정버튼 -->
    <v-menu v-if="this.$store.state.auth.auth" offset-y>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom color="blue darken-1">
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              class="mx-1"
              large
              icon
              v-bind="attrs"
              v-on="{ ...menu, ...tooltip }"
            >
              <v-icon> mdi-pin-outline </v-icon>
            </v-btn>
          </template>
          <!-- :style="{ backgroundColor: 'white' }" -->
          <span>골라보기</span>
        </v-tooltip>
      </template>

      <v-list class="py-0">
        <v-dialog v-model="dialog" persistent>
          <template v-slot:activator="{ on: _dialog }">
            <v-list-item @click="getselectedStocks()" v-on="{ ..._dialog }">
              <v-list-item-icon class="pl-1">
                <v-icon>mdi-domain</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="pr-3">종목</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <!-- 종목 골라보기 다이얼로그 -->
          <v-card class="pa-3" min-height="670px">
            <v-container class="py-6">
              <v-row>
                <v-col cols="12">
                  <p
                    style="color: #42a5f5"
                    class="text-h4 text-center font-weight-black mb-0"
                    @click="dialog = true"
                  >
                    종목 골라보기
                  </p>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="5">
                  <v-text-field
                    v-model="magnify_stock"
                    flat
                    filled
                    dense
                    rounded
                    placeholder="종목"
                    hide-details="auto"
                    append-icon="mdi-magnify"
                    @keyup.enter="searchstocks()"
                    @click:append="searchstocks()"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <template v-for="(chunk, index) in stocks">
                  <v-container v-if="page == index + 1" :key="candy + index">
                    <v-row v-for="(a, i) in 5" :key="i" justify="center">
                      <v-col v-for="(b, ind) in 5" :key="ind" cols="2">
                        <v-card
                          v-for="(ele, idx) in chunk.slice(
                            i * 5 + b - 1,
                            i * 5 + b
                          )"
                          :key="idx"
                          style="border: 1px solid"
                        >
                          <v-checkbox
                            v-model="selectedstocks"
                            class="ml-6"
                            :label="ele.company_name.toString()"
                            :value="ele.company_no"
                          >
                          </v-checkbox>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
              </v-row>
              <v-row justify="space-between">
                <v-col></v-col>
                <v-col>
                  <v-pagination
                    v-model="page"
                    :length="pages"
                    :total-visible="visible"
                    circle
                  ></v-pagination></v-col
                ><v-col align="right" align-self="end">
                  <v-btn
                    x-large
                    color="#42A5F5"
                    dark
                    class="text-h6 font-weight-bold"
                    @click="[(dialog = false), registerStocks()]"
                    >확인</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2" persistent>
          <template v-slot:activator="{ on: _dialog2 }">
            <v-list-item
              @click="getselectedIndustries()"
              v-on="{ ..._dialog2 }"
            >
              <v-list-item-icon class="pl-1">
                <v-icon>mdi-factory</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="pr-3">산업</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <!-- 다이얼로그 산업고르기 -->
          <v-card class="pa-3" min-height="670px">
            <v-container class="py-6">
              <v-row>
                <v-col>
                  <p
                    style="color: #42a5f5"
                    class="text-h4 text-center font-weight-bold mb-0"
                  >
                    산업 골라보기
                  </p>
                </v-col>
              </v-row>
              <v-row justify="center">
                <template v-for="(chunk2, index2) in industries">
                  <v-container
                    v-if="page2 == index2 + 1"
                    :key="candy2 + index2"
                  >
                    <v-row v-for="(c, i2) in 5" :key="i2" justify="center">
                      <v-col v-for="(d, ind2) in 5" :key="ind2" cols="2">
                        <v-card
                          v-for="(ele2, idx2) in chunk2.slice(
                            i2 * 5 + d - 1,
                            i2 * 5 + d
                          )"
                          :key="idx2"
                          style="border: 1px solid"
                        >
                          <v-checkbox
                            v-model="selectedindustries"
                            class="ml-6"
                            :label="ele2.industry_type.toString()"
                            :value="ele2.industry_no"
                          >
                          </v-checkbox>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
              </v-row>
              <v-row justify="space-between">
                <v-col></v-col>
                <v-col>
                  <v-pagination
                    v-model="page2"
                    :length="pages2"
                    :total-visible="7"
                    circle
                  ></v-pagination
                ></v-col>
                <v-col align-self="end" align="right">
                  <v-btn
                    x-large
                    color="#42A5F5"
                    dark
                    class="text-h6 font-weight-bold"
                    @click="[(dialog2 = false), registerIndustries()]"
                    >확인</v-btn
                  ></v-col
                >
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-list>
    </v-menu>

    <!-- 내정보 버튼 -->
    <v-tooltip v-if="this.$store.state.auth.auth" bottom color="blue darken-1">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-1"
          large
          icon
          v-bind="attrs"
          to="/like-report"
          v-on="on"
        >
          <v-icon> mdi-account-outline </v-icon>
        </v-btn>
      </template>
      <!-- :style="{ backgroundColor: 'white' }" -->
      <span>마이페이지</span>
    </v-tooltip>

    <!-- 로그인버튼 -->
    <v-tooltip v-if="this.$store.state.auth.auth" bottom color="blue darken-1">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-1"
          large
          icon
          v-bind="attrs"
          @click="logout()"
          v-on="on"
        >
          <v-icon> mdi-logout </v-icon>
        </v-btn>
      </template>
      <!-- :style="{ backgroundColor: 'white' }" -->
      <span>로그아웃</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import * as authApi from "@/api/auth";
import * as interestApi from "@/api/interest";

import { mapState } from "vuex";

export default {
  name: "Appbar",
  data() {
    return {
      dialog: false,
      dialog2: false,
      magnify_stock: "",
      page: 1,
      page2: 1,
      visible: 7,
      selectedstocks: [],
      selectedindustries: [],
      candy: 0,
      candy2: 0,
    };
  },
  computed: {
    ...mapState("interest", [
      "stocks",
      "industries",
      "stockscount",
      "industriescount",
      "pages",
    ]),
    ...mapState("auth", ["userId"]),

    pages2() {
      return Math.ceil(this.industriescount / 25);
    },
  },
  created() {},
  methods: {
    async logout() {
      try {
        const response = await authApi.logout();
        if (response.status === 200) {
          this.$router.push({ name: "Home" });
        }
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
    async searchstocks() {
      await this.$store.dispatch(
        "interest/callSearchStocks",
        this.magnify_stock
      );
      this.candy += 1;
      this.page = 1;
    },
    async getselectedStocks() {
      try {
        await this.$store.dispatch("interest/callInterest");
        const response = await interestApi.getselectedStocks(this.userId);

        if (response.status === 200) {
          for (var i = 0; i < response.data.rows2.length; i++)
            this.selectedstocks.push(response.data.rows2[i].company_no);
        }
      } catch (err) {
        if (err.reponse.status === 500) {
          console.log(err.response.data.message);
        }
      }
    },
    async getselectedIndustries() {
      try {
        const response = await interestApi.getselectedIndustries(this.userId);
        if (response.status === 200) {
          for (var i = 0; i < response.data.rows2.length; i++)
            this.selectedindustries.push(response.data.rows2[i].industry_no);
        }
      } catch (err) {
        if (err.reponse.status === 500) {
          console.log(err.response.data.message);
        }
      }
    },
    async registerStocks() {
      try {
        this.page = 1;
        this.magnify_stock = "";
        await interestApi.registerStocks(this.userId, this.selectedstocks);
      } catch (err) {
        if (err.response.status === 500) {
          console.log(err.response.data.message);
        }
      }
    },
    async registerIndustries() {
      try {
        await interestApi.registerIndustries(
          this.userId,
          this.selectedindustries
        );
      } catch (err) {
        if (err.response.status === 401) {
          console.log(err.response.data.message);
        }
      }
    },
  },
};
</script>

<style scoped></style>
