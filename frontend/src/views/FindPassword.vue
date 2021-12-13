<template>
  <v-app app>
    <v-main class="back">
      <v-container fill-height fluid>
        <v-row justify="center">
          <v-col cols="12" md="5">
            <v-card
              class="mx-auto"
              max-width="550px"
              max-height="700px"
              tile
              outlined
              elevation="1"
            >
              <v-container fluid>
                <v-form ref="form" lazy-validation class="mx-6">
                  <!-- 비밀번호 찾기 -->
                  <v-row class="mt-6">
                    <v-col cols="12">
                      <v-card flat class="text-center my-6">
                        <router-link
                          class="text-h4 font-weight-black"
                          to="/report"
                          :style="{ color: 'black', textDecoration: 'none' }"
                        >
                          Mojuri
                        </router-link>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <p class="text-h5 text-left font-weight-bold">
                        비밀번호 찾기
                      </p>
                      <v-divider class="divider"></v-divider>
                    </v-col>
                  </v-row>
                  <!-- 설명 + 이메일 input -->
                  <v-row>
                    <v-col cols="12">
                      <p
                        v-if="done === false"
                        class="
                          pr-6
                          mb-0
                          text-subtitle-1 text-left
                          font-weight-bold
                        "
                      >
                        이메일 ID를 입력해 주시면 해당 메일 주소로
                        임시비밀번호를 보내드립니다.
                      </p>
                      <p
                        v-if="done === true"
                        class="pr-6 mb-0 text-h4 text-left font-weight-bold"
                      >
                        전송 완료
                      </p>
                    </v-col>
                    <v-col cols="12" class="pb-0">
                      <v-text-field
                        v-if="done === false"
                        v-model="email"
                        :rules="emailRules"
                        outlined
                        label="이메일"
                        required
                        @keyup.enter="transport()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- 임시비밀번호발급 버튼 -->
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-btn
                        v-if="done === false"
                        dark
                        block
                        large
                        tile
                        elevation="1"
                        class="blue lighten-1 text-h5 font-weight-bold"
                        @click="transport()"
                      >
                        전송
                      </v-btn>
                    </v-col>
                  </v-row>
                  <!-- 로그인하기 -->
                  <v-row class="my-6" justify="center">
                    <v-col cols="6">
                      <router-link to="/user-authentication">
                        <p class="pt-1 text-subtitle-1 text-center">
                          로그인으로 돌아가기
                        </p>
                      </router-link>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as authApi from "@/api/auth";
export default {
  name: "FindPassword",
  components: {},
  data() {
    return {
      email: "",
      done: false,
      emailRules: [
        (v) => !!v || "이메일 입력은 필수입니다.",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "올바른 이메일을 입력해주세요",
      ],
    };
  },
  created() {
    this.done = false;
  },
  methods: {
    async transport() {
      const val = await this.$refs.form.validate();
      if (val) {
        try {
          const response = await authApi.passwordTransport(this.email);

          if (response.status === 200) {
            this.done = true;
          }
        } catch (err) {
          alert(err.response.data.message);
        }
      }
    },
  },
};
</script>

<style></style>
