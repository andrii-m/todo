<template>
  <header class="header-section">
    <div class="container">
      <div class="row align-items-center justify-content-between">
        <div class="col-lg-3 d-flex">
          <HeaderUser v-if="isLoggedIn" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import HeaderUser from "./HeaderUserInfo";
import { mapGetters } from "vuex";

export default {
  components: { HeaderUser },

  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
    }),
  },
};
</script>

<style scoped lang="scss" src="./index.scss" />
