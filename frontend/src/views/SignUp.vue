<template>
  <v-container fill-height style="max-width: 600px">
    <v-layout align-center justify-center>
      <v-flex>
        <v-card>
          <p class="pt-9 text-md-center display-1">Mojuri</p>
          <p class="headline">기본정보 입력</p>
          <v-layout align-content-space-around>
            <v-text-field
              v-model="email"
              name="email"
              label="이메일(ID)"
            ></v-text-field>
          </v-layout>
          <v-layout align-content-space-around>
            <v-text-field
              v-model="nickname"
              name="nickname"
              label="닉네임"
            ></v-text-field>
          </v-layout>
          <v-layout align-content-space-around>
            <v-text-field
              v-model="passoword"
              name="password"
              type="password"
              label="비밀번호"
            ></v-text-field>
          </v-layout>
          <v-layout align-content-space-around>
            <v-flex> test </v-flex>
          </v-layout>
          <v-layout align-content-space-around>
            <v-flex> test </v-flex>
          </v-layout>
          <v-layout>
            <div class="mx-auto">
              <v-btn large class="grey lighten-1"> </v-btn>
            </div>
          </v-layout>
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
      nickname: null,
    };
  },
};
</script>

<style></style>
