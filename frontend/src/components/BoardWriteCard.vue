<template>
  <v-card max-width="" min-width="" class="mx-auto" flat>
    <v-container>
      <!-- 게시판 글쓰기 -->
      <v-row>
        <v-col cols="auto" class="mt-6 ml-6 pa-0">
          <p class="text-h5 text-left font-weight-black mb-0">글쓰기</p>
        </v-col>
      </v-row>

      <!-- 분야 선택  -->
      <v-row>
        <v-col cols="auto">
          <v-card width="100px" class="ml-3 mt-1" flat>
            <v-select
              :items="themes"
              label="분야"
              solo
              dense
              outlined
              hide-details="auto"
            ></v-select>
          </v-card>
        </v-col>
      </v-row>
      <!-- 제목 입력 바 -->
      <v-row>
        <v-col cols="12" class="pt-2">
          <v-card class="ml-3" flat>
            <v-text-field
              v-model="title"
              solo
              label="제목"
              dense
              hide-details="auto"
              outlined
              style="border-radius: 15px"
            >
            </v-text-field>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12"> </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      title: "",
      themes: ["종목", "이슈", "유머", "자유"],
    };
  },
};
</script>

<style scoped>
.v-text-field >>> label {
  font-size: 18px;
}
</style>
