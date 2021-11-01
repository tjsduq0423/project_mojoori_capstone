<template>
  <v-container fill-height style="max-width: 600px">
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-card outlined>
          <v-toolbar flat class="brown lighten-1" dark>
            <v-toolbar-title class="pl-3"> 비밀번호 변경 </v-toolbar-title>
          </v-toolbar>
          <div class="ma-5 pa-5">
            <v-text-field v-model="email" label="이메일을 입력하세요" />

            <v-select
              v-model="checkValue"
              :items="items"
              label="본인확인질문"
            />

            <v-text-field
              v-model="answer"
              label="본인확인질문의 답별을 입력하세요"
            />

            <v-btn
              class="mt-3 mb-3 brown lighten-1"
              rounded
              depressed
              large
              block
              dark
              @click="authentication"
            >
              확인
            </v-btn>

            <v-text-field
              v-if="auth === true"
              v-model="password"
              class="mt-5"
              label="새 비밀번호를 입력하세요"
            />

            <v-btn
              v-if="auth === true"
              class="brown lighten-1"
              rounded
              depressed
              large
              block
              dark
              to="/user-authentication"
            >
              변경
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
      items: [
        "주식을 시작한 계기는?",
        "주식 하면서 가장 인상 깊었던 종목은?",
        "잊혀지지 않는 날짜는?",
        "가장 기억에 남는 장소는?",
        "가장 존경하는 주식 선생님은?",
      ],
      checkValue: null,
      answer: null,
      auth: false,
    };
  },
  methods: {
    authentication() {
      this.auth = !this.auth;
    },
  },
};
</script>

<style></style>
