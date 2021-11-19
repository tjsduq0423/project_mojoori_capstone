<template>
  <v-app-bar color="#0D0D0D" dark app>
    <!-- 툴바 제목 Mojuri -->
    <v-toolbar-title>
      <router-link
        to="/"
        :style="{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.5em',
        }"
        class="ml-2"
        >Mojuri
      </router-link>
    </v-toolbar-title>

    <v-spacer />
    <!-- 게시판 바로가기 버튼 -->
    <v-btn
      class="ma-2 grey lighten-1"
      :style="{ fontSize: '1.25em', fontWeight: 'bold' }"
      large
      to="/board-logined"
    >
      게시판
      <v-icon large right class="ml-3"> mdi-clipboard-edit-outline </v-icon>
    </v-btn>
    <!-- 사용자 알림내용 열람용 버튼 -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon class="ma-2 grey lighten-1" v-bind="attrs" v-on="on">
          <v-badge color="green" :content="items.length">
            <v-icon large>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list class="py-0">
        <template v-for="(item, index) in items">
          <v-list-item :key="index">
            <v-list-item-title
              >{{ item.content }} {{ item.period }}일전
            </v-list-item-title>
          </v-list-item>
          <v-divider
            v-if="index < items.length - 1"
            :key="`${index} - divider`"
          ></v-divider>
        </template>
      </v-list>
    </v-menu>
    <!-- 사용자 전용페이지 관리버튼 -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon class="ma-2 grey lighten-1" v-bind="attrs" v-on="on">
          <v-icon large>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list class="py-0">
        <v-list-item>
          <div class="text-center">
            <v-dialog v-model="dialog" width="900" min-height="800">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on"> 관심종목설정 </v-btn>
              </template>

              <v-card>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <p
                        style="color: #64ffda"
                        class="text-h4 text-center font-weight-black mb-0"
                      >
                        관심 종목 설정
                      </p>
                    </v-col>
                  </v-row>
                  <v-row justify="end">
                    <v-col cols="8">
                      <v-text-field
                        v-model="magnify"
                        solo
                        dense
                        label="종목"
                        flat
                        hide-details="auto"
                        outlined
                        style="border-radius: 15px"
                      >
                        <v-icon slot="append" color="black" large
                          >mdi-magnify</v-icon
                        >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <template v-for="(chunk, index) in stocks">
                      <v-container v-if="page == index + 1" :key="index">
                        <v-row
                          v-for="(a, i) in 5"
                          :key="i"
                          justify="space-around"
                        >
                          <v-col
                            v-for="(ele, idx) in chunk.slice(
                              i * 5,
                              (i + 1) * 5
                            )"
                            :key="idx"
                          >
                            <v-checkbox
                              v-model="selectedstocks"
                              :label="ele.toString()"
                              :value="ele"
                            >
                            </v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </template>
                  </v-row>
                  <v-row justify="center">
                    <v-pagination
                      v-model="page"
                      :length="pages"
                      :total-visible="7"
                      circle
                    ></v-pagination>
                  </v-row>
                  <v-row justify="end">
                    <v-btn text @click="[(dialog = false), registerStocks()]"
                      >확인</v-btn
                    >
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
          </div>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <div class="text-center">
            <v-dialog v-model="dialog2" width="900">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on"> 관심산업설정 </v-btn>
              </template>

              <v-card>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <p
                        style="color: #64ffda"
                        class="text-h4 text-center font-weight-black mb-0"
                      >
                        관심 산업 설정
                      </p>
                    </v-col>
                  </v-row>
                  <v-row justify="end">
                    <v-col cols="8">
                      <v-text-field
                        v-model="magnify"
                        solo
                        dense
                        label="산업"
                        flat
                        hide-details="auto"
                        outlined
                        style="border-radius: 15px"
                      >
                        <v-icon slot="append" color="black" large
                          >mdi-magnify</v-icon
                        >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <template v-for="(chunk2, index2) in industries">
                      <v-container v-if="page2 == index2 + 1" :key="index2">
                        <v-row
                          v-for="(b, i2) in 5"
                          :key="i2"
                          justify="space-around"
                        >
                          <v-col
                            v-for="(ele2, idx2) in chunk2.slice(
                              i2 * 5,
                              (i2 + 1) * 5
                            )"
                            :key="idx2"
                          >
                            <v-checkbox
                              v-model="selectedindustries"
                              :label="ele2.toString()"
                              :value="ele2"
                            >
                            </v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </template>
                  </v-row>
                  <v-row justify="center">
                    <v-pagination
                      v-model="page2"
                      :length="pages2"
                      :total-visible="7"
                      circle
                    ></v-pagination>
                  </v-row>
                  <v-row justify="end">
                    <v-btn
                      text
                      @click="[(dialog2 = false), registerIndustries()]"
                      >확인</v-btn
                    >
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
          </div>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-row justify="center">
            <v-btn text @click="goMypage()"> 마이페이지 </v-btn>
          </v-row>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item>
          <v-row justify="center">
            <v-btn text @click="logout()"> 로그아웃 </v-btn>
          </v-row>
        </v-list-item>
      </v-list>

      <!-- dialog 이용하여 관심종목 설정-->
    </v-menu>
  </v-app-bar>
</template>

<script>
import * as authApi from "@/api/auth";
import { mapState } from "vuex";
import * as interestApi from "@/api/interest";
export default {
  name: "AppbarLogined",
  data() {
    return {
      dialog: false,
      dialog2: false,
      items: [
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 3 },
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 2 },
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 1 },
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 1 },
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 2 },
        { content: "삼성전자 리포트가 업로드 되었습니다.", period: 3 },
      ],
      magnify: "",
      page: 1,
      page2: 1,
      selectedstocks: [],
      selectedindustries: [],
    };
  },
  computed: {
    ...mapState("interest", [
      "stocks",
      "industries",
      "stockscount",
      "industriescount",
    ]),
    ...mapState("auth", ["userId"]),
    pages() {
      return Math.ceil(this.stockscount / 25);
    },
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
          console.log(response.data.message);
          this.$router.push({ name: "Default" });
        }
      } catch (err) {
        console.log("로그아웃 실패");
      }
    },
    goMypage() {
      this.$router.push({ name: "LikeReport" });
    },
    async registerStocks() {
      try {
        const response = await interestApi.registerStocks(
          this.userId,
          this.selectedstocks
        );
        if (response.status === 200) {
          console.log(response.data.userintereststocks);
        }
      } catch (err) {
        if (err.response.status === 401) {
          console.log(err.response.data.message);
        }
      }
    },
    async registerIndustries() {
      try {
        const response = await interestApi.registerIndustries(
          this.userId,
          this.selectedindustries
        );
        if (response.status === 200) {
          console.log(response.data.userinterestindustries);
        }
      } catch (err) {
        if (err.response.status === 401) {
          console.log(err.response.data.message);
        }
      }
    },
  },
};
</script>

<style></style>
