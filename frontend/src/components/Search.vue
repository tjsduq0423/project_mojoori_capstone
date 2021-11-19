<template>
  <v-row>
    <v-col cols="12">
      <!-- 검색 바 ==> autocomplete 기능 필요 -->
      <v-text-field
        v-model="magnify"
        dense
        flat
        filled
        rounded
        placeholder="제목"
        hide-details="auto"
        append-icon="mdi-magnify"
        @keyup.enter="nothing()"
      >
      </v-text-field>
    </v-col>
    <v-col cols="12">
      <v-card width="100%" min-height="50" tile elevation="1">
        <template v-for="(tag, idx) in tags">
          <v-chip
            :key="idx"
            class="ma-2"
            text-color="white"
            :color="tag.color"
            label
            close
            @click:close="remove(idx)"
          >
            <!-- removetag구현필요 -->
            {{ tag.name }}
          </v-chip>
        </template>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
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
        </v-col>
        <v-col cols="auto">
          <v-btn
            large
            class="red--text mt-auto px-3"
            text
            :style="{ fontSize: '18px', fontWeight: 'bold' }"
          >
            <v-icon class="pr-2"> mdi-arrow-up-bold-box </v-icon>
            상승여력순 정렬
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      magnify: "",
      selection: 0,
      historyList: [],
      tags: [{ name: "아프리카TV", color: "deep-orange darken-1" }],
      buttonitem: ["전체", "기업", "산업", "시장"],
    };
  },
  methods: {
    nothing() {
      console.log("heloo");
    },
    remove(idx) {
      this.tags.splice(idx, 1);
    },
  },
};
</script>

<style></style>
