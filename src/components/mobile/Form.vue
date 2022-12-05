<template>
  <Register v-if="state" @alter="alter" />
  <Login v-else @alter="alter" />
</template>

<script>
import Login from "./lib/Login.vue";
import Register from "./lib/Register.vue";

export default {
  name: "MobileLogin",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      state: false,
    };
  },
  methods: {
    alter() {
      this.state ? (this.state = false) : (this.state = true);
    },
  },
};
</script>

<style scoped>
</style>
