<template>
  <v-app app>
    <AppbarNone />
    <v-main class="back">
      <v-container fill-height fluid>
        <v-row justify="center">
          <v-col cols="12" md="5">
            <v-card
              class="mx-auto"
              max-width="550px"
              max-height="700px"
              tile
              style="border: solid"
            >
              <v-container fluid>
                <v-form ref="form" lazy-validation class="mx-6">
                  <!-- 비밀번호 찾기 -->
                  <v-row class="mt-6">
                    <v-col cols="12">
                      <p class="text-h4 text-center font-weight-black">
                        Mojuri
                      </p>
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
                        class="
                          pr-6
                          mb-0
                          blue
                          text-h4 text-left
                          font-weight-bold
                        "
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
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- 임시비밀번호발급 버튼 -->
                  <v-row justify="center">
                    <v-col cols="6">
                      <v-btn
                        v-if="done === false"
                        dark
                        block
                        large
                        tile
                        class="grey lighten-1 text-h5 font-weight-bold"
                        @click="validate()"
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
import AppbarNone from "@/components/AppbarNone.vue";

export default {
  name: "FindPassword",
  components: {
    AppbarNone,
  },
  data() {
    return {
      loginState: null,
      email: "",
      password: "",
      show: false,
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
  methods: {
    async validate() {
      const val = await this.$refs.form.validate();
      if (val) {
        this.$router.push({ name: "EmailAuthenticationDone" });
        // axios call email 로 임시비밀번호 생성 후 전송
        // response로 메일이 등록되어있는지 확인 . err ->  alert // 아니면 v-if 값 done 값 변경
        //  --> 페이지 이동  $router.push({name :"user-authentication"}))
      }
    },
  },
};
</script>

<style></style>
