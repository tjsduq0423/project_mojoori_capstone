<template>
  <v-app app>
    <!-- appbar -->
    <AppbarNone />
    <!-- 회원가입 컴포넌트 -->
    <v-main>
      <v-layout justify-center class="back mt-3">
        <v-form ref="form" lazy-validation>
          <v-card width="550px" height="700px" tile style="border: solid">
            <v-layout column align-center>
              <p class="my-6 pt-6 display-1" style="font-weight: bold">
                Mojuri
              </p>
            </v-layout>
            <p class="ml-6 mb-6 headline" style="font-weight: bold">
              신규비밀번호입력
            </p>
            <v-divider class="divider mx-auto"></v-divider>
            <v-layout class="mt-6" column>
              <p class="mx-7 mb-6 subheading">
                새로운 비밀번호를 입력해주세요.
              </p>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show ? 'text' : 'password'"
                outlined
                label="기존 비밀번호 입력"
                required
                class="mx-6"
                @click:append="show = !show"
              ></v-text-field>
              <v-text-field
                v-model="newpassword"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show ? 'text' : 'password'"
                outlined
                label="신규 비밀번호 입력"
                required
                class="mx-6"
                @click:append="show = !show"
              ></v-text-field>
              <v-text-field
                v-model="newpassword2"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="newpasswordRules"
                :type="show ? 'text' : 'password'"
                outlined
                label="신규 비밀번호 재입력"
                required
                class="mx-6"
                @click:append="show = !show"
              ></v-text-field>
            </v-layout>
            <v-layout column align-center>
              <v-btn
                dark
                width="500px"
                height="50px"
                class="grey lighten-1"
                @click="validate"
                ><p class="pt-6 headline" style="font-weight: bold">
                  변경하기
                </p></v-btn
              >
            </v-layout>
          </v-card>
        </v-form>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
import AppbarNone from "@/components/AppbarNone.vue";
export default {
  name: "SignUp",
  components: {
    AppbarNone,
  },
  data() {
    return {
      password: "",
      newpassword: "",
      newpassword2: "",
      show: false,
      passwordRules: [
        (v) => !!v || "기존비밀번호와 다릅니다.",
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,14}$/.test(
            v //기존비밀번호와 매칭구현필요
          ) || "기존비밀번호와 다릅니다.",
      ],
      newpasswordRules: [
        (v) => !!v || "비밀번호가 다릅니다.",
        () => this.newpassword == this.newpassword2 || "비밀번호가 다릅니다.",
      ],
    };
  },
  methods: {
    async validate() {
      const val = await this.$refs.form.validate();
      if (val) {
        this.$router.push({ name: "EmailAuthentication" });
        // axios call email 로 임시비밀번호 생성 후 전송
        // then( alert 창(임시비밀번호 발송되었습니다.)
        //  --> 페이지 이동  $router.push({name :"user-authentication"}))
      }
    },
  },
};
</script>

<style>
.divider {
  border-width: 1px !important;
  border-color: black !important;
  width: 90%;
}
.v-text-field--outlined fieldset {
  border-width: 2px !important;
  color: black !important;
}
.back {
  background-color: #f2f2f2 !important;
}
</style>
