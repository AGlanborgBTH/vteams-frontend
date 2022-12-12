<template>
  <div class="mobile">
    <Main v-if="loggedIn" />
    <Form v-else @logIn="logIn" />
  </div>
</template>

<script>
import Form from "./mobile/Form.vue";
import Main from "./mobile/Main.vue";

export default {
  name: "MobileMain",
  components: {
    Form,
    Main,
  },
  data() {
    return {
      loggedIn: false
    }
  },
  methods: {
    logIn() {
      this.loggedIn = true
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
