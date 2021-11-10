<template>
  <v-card max-width="" min-width="" class="mx-auto" flat>
    <v-container>
      <!-- 게시판 제목 -->
      <v-row>
        <v-col cols="auto" class="mt-6 ml-6 pa-0">
          <p class="text-h5 text-left font-weight-black mb-0">게시글 제목</p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <p class="text-subtitle-2 mb-0">조회 10 | 댓글 2 | 추천 3</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="text-subtitle-1 mb-0 text-left">1 분전 | 작성자 이름</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-divider class="divider"></v-divider>
        </v-col>
      </v-row>
      <v-row> 게시글 내용 </v-row>
      <v-row>
        <v-col>
          <v-divider class="divider"></v-divider>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="4">
          <v-row justify="space-around">
            <v-btn>
              <v-icon> mdi-menu-up </v-icon>
              3
            </v-btn>
            <v-btn> <v-icon> mdi-menu-down </v-icon> 3 </v-btn>
            <v-btn> 북마크 </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
