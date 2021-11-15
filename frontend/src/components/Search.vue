<template>
  <v-container class="mx-auto mb-auto">
    <v-layout justify-center column>
      <v-flex class="mt-3">
        <!-- 검색 바 ==> autocomplete 기능 필요 -->
        <v-text-field
          v-model="magnify"
          solo
          dense
          label="제목"
          flat
          hide-details="auto"
          outlined
          style="border-radius: 15px"
        >
          <v-icon slot="append" color="black" large @click="nothing"
            >mdi-magnify</v-icon
          >
        </v-text-field>
      </v-flex>
      <v-flex>
        <SearchTag :industry="true" :corporation="true" />
      </v-flex>

      <v-layout justify-space-between>
        <!-- 전체 기업 산업 시장 칩 모음 -->
        <v-chip-group
          v-model="selection"
          active-class="teal accent-2 white--text"
          column
        >
          <v-chip
            v-for="(button, i) in buttonitem"
            :key="i"
            label
            :style="{ fontSize: '18px', fontWeight: 'bold' }"
            class="white px-6 py-5 mr-6"
          >
            {{ button }}
          </v-chip>
        </v-chip-group>
        <!-- 정렬 버튼 -->
        <v-btn
          large
          class="red--text mt-auto px-3"
          text
          :style="{ fontSize: '18px', fontWeight: 'bold' }"
        >
          <v-icon class="pr-2"> mdi-arrow-up-bold-box </v-icon>
          상승여력순 정렬
        </v-btn>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import SearchTag from "@/components/SearchTag.vue";
export default {
  components: {
    SearchTag,
  },
  data() {
    return {
      magnify: "",
      selection: 0,
      historyList: [],
      buttonitem: ["전체", "기업", "산업", "시장"],
    };
  },

  methods: {
    nothing() {
      console.log("heloo");
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined fieldset {
  border-width: 4px !important;
  color: black !important;
}
.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
}
</style>
