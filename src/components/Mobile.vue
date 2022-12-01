<template>
  <div class="mobile">
    <Main v-if="loggedIn" />
    <Login v-else />
  </div>
</template>

<script>
import Login from "./mobile/Login.vue";
import Main from "./mobile/Main.vue";

export default {
  name: "MobileMain",
  components: {
    Login,
    Main,
  },
  data() {
    return {
      loggedIn: false
    }
  }
};
</script>

<style scoped>
.mobile {
  height: 100vh;
  width: 100vw;
  position: relative;
  background: #2e3b61;
}
</style>
