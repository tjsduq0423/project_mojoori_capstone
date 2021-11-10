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
                  <v-row class="mt-6">
                    <v-col cols="12">
                      <p class="text-h4 text-center font-weight-black">
                        Mojuri
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <p class="text-h5 text-left font-weight-bold">
                        신규 비밀번호 입력
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
                        새로운 비밀번호를 입력해주세요.
                      </p>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="show ? 'text' : 'password'"
                        outlined
                        label="기존 비밀번호 입력"
                        required
                        @click:append="show = !show"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="newpassword"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="show ? 'text' : 'password'"
                        outlined
                        label="신규 비밀번호 입력"
                        required
                        @click:append="show = !show"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="newpassword2"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="samepasswordRules"
                        :type="show ? 'text' : 'password'"
                        outlined
                        label="신규 비밀번호 재입력"
                        required
                        @click:append="show = !show"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mb-4">
                    <v-col cols="12" class="py-0">
                      <v-btn
                        dark
                        block
                        large
                        tile
                        class="grey lighten-1 text-h5 font-weight-bold"
                        @click="validate()"
                      >
                        변경하기
                      </v-btn>
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
      newpassword: "",
      newpassword2: "",
      show: false,
      done: false,
      passwordRules: [
        (v) => !!v || "비밀번호 입력은 필수입니다.",
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,14}$/.test(
            v
          ) || "비밀번호 조건 : 최소 8자, 최대 14자, 특수문자, 숫자, 문자",
      ],
      samepasswordRules: [
        (v) => !!v || "비밀번호가 동일하지 않습니다.",
        () =>
          this.newpassword == this.newpassword2 ||
          "비밀번호가 동일하지 않습니다.",
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
