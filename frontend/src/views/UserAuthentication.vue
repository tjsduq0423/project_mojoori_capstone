<template>
  <v-container fill-height style="max-width: 600px">
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-card outlined>
          <v-toolbar flat class="brown lighten-1" dark>
            <v-toolbar-title class="pl-3"> 로그인 </v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon to="/find-password">
                  <v-icon v-on="on"> mdi-lock </v-icon>
                </v-btn>
              </template>
              <span>비밀번호 찾기</span>
            </v-tooltip>
          </v-toolbar>
          <div class="ma-5 pa-5">
            <v-text-field v-model="email" label="이메일을 입력하세요" />
            <v-text-field
              v-model="password"
              type="password"
              label="패스워드를 입력하세요"
            />
            <v-btn
              class="brown lighten-1"
              large
              rounded
              depressed
              block
              dark
              to="/"
            >
              로그인
            </v-btn>
            <v-btn
              class="mt-3 brown lighten-1"
              rounded
              depressed
              large
              block
              dark
              to="/sign-up"
            >
              회원가입
            </v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
};
</script>

<style></style>
