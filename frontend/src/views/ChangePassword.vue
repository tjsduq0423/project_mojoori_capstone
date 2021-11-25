<template>
  <v-app app>
    <v-main class="back">
      <v-container fill-height fluid>
        <v-row justify="center">
          <v-col cols="12" md="4">
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
                        @keyup.enter="changePassword()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="newPassword"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="newPasswordRules"
                        :type="show ? 'text' : 'password'"
                        outlined
                        label="신규 비밀번호 입력"
                        required
                        @click:append="show = !show"
                        @keyup.enter="changePassword()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="samePassword"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="samepasswordRules"
                        :type="show ? 'text' : 'password'"
                        outlined
                        label="신규 비밀번호 재입력"
                        required
                        @click:append="show = !show"
                        @keyup.enter="changePassword()"
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
                        elevation="1"
                        style="margin-bottom: 3rem"
                        class="blue lighten-1 text-h5 font-weight-bold"
                        @click="changePassword()"
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
import * as authApi from "@/api/auth";
export default {
  name: "FindPassword",
  components: {},
  data() {
    return {
      loginState: null,
      email: "",
      password: "",
      newPassword: "",
      samePassword: "",
      show: false,
      done: false,
      passwordRules: [(v) => !!v || "필수 입력입니다."],
      newPasswordRules: [
        (v) => !!v || "필수 입력입니다.",
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,14}$/.test(
            v
          ) || "비밀번호 조건 : 최소 8자, 최대 14자, 특수문자, 숫자, 문자",
        (v) => this.password !== v || "이전과 다른 비밀번호를 입력해주세요.",
      ],
      samepasswordRules: [
        (v) => !!v || "필수 입력입니다.",
        (v) => v === this.samePassword || "비밀번호가 동일하지 않습니다.",
      ],
    };
  },
  methods: {
    async changePassword() {
      const val = await this.$refs.form.validate();
      if (val) {
        try {
          const response = await authApi.changePassword(
            this.$store.state.auth.userId,
            this.password,
            this.newPassword
          );

          if (response.status === 200) {
            alert(response.data.message);
            this.$router.push({ path: "/report" });
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
