<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/app.scss";
</style>
