<template>
  <v-app-bar color="#0D0D0D" dark app>
    <!-- 툴바 제목 Mojuri -->
    <v-toolbar-title>
      <a
        href="/"
        :style="{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.5em',
        }"
        class="ml-2"
        >Mojuri
      </a>
    </v-toolbar-title>

    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
  name: "AppbarNone",
  data() {
    return {};
  },
};
</script>

<style></style>
