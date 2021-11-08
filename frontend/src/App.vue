<template>
  <router-view />
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
.divider {
  border-width: 1px !important;
  border-color: black !important;
  width: 90%;
}
.v-text-field--outlined fieldset {
  border-width: 3px !important;
  color: black !important;
}
.back {
  background-color: #f2f2f2 !important;
}
</style>
