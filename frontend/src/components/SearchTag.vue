<template>
  <v-container class="px-0">
    <v-layout justify-center column>
      <v-flex>
        <!-- 검색 태그들 by 칩+ 카드 -->
        <v-card height="50">
          <v-chip
            v-for="(tag, i) in searchHistory"
            :key="i"
            class="ma-2"
            text-color="white"
            color="deep-orange darken-1"
            label
            close
            @click:close="removeList(i)"
          >
            {{ tag }}
          </v-chip>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchHistory: ["에코프로", "JYP엔터", "큐브엔터"],
    };
  },
  methods: {
    removeList: function (i) {
      this.searchHistory.splice(i, 1);
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
