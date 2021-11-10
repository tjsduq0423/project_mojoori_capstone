<template>
  <v-card height="400" elevation="11" class="mx-auto" width="60%">
    <v-card-title
      class="text-h5 title"
      style="font-weight: 900; font-size: 25px !important"
    >
      {{ userid }}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              style="font-weight: 900; font-size: 20px"
              text
              large
              class="button"
            >
              관심 종목
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              style="font-weight: 900; font-size: 20px"
              text
              large
              class="button"
            >
              관심 산업
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              style="font-weight: 900; font-size: 20px"
              text
              large
              class="button"
            >
              찜한 리포트
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              style="font-weight: 900; font-size: 20px"
              text
              large
              class="button"
            >
              내가 쓴 글
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              style="font-weight: 900; font-size: 20px"
              text
              large
              class="button"
              to="/change-password"
            >
              비밀번호 변경
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MyPageBox",
  data() {
    return {
      userid: "문준호",
      mypagebuttons: [
        "관심 종목",
        "관심 산업",
        "찜한 리포트",
        "내가 쓴 글",
        "비밀번호 변경",
      ],
    };
  },
};
</script>

<style>
.title {
  border-bottom-style: solid;
  border-bottom-width: 3px;
  border-bottom-color: black;
}
.button {
  background-color: white !important;
  border-radius: 0px !important;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  border-bottom-color: black;
}
</style>
