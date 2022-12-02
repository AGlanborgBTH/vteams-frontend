<template>
  <Login
    v-if="state"
    @alter="alter"
    title="Register"
    excerpt="Register to create a profile"
    sup="0"
    submit="Register"
    footer="Already have an account?"
    alt="Log in"
  />
  <Login
    v-else
    @alter="alter"
    title="Login"
    excerpt="Login to access your profile"
    sup="1"
    submit="Sign in"
    footer="Don't have an account?"
    alt="Sign up"
  />
</template>

<script>
import Login from "./lib/Login.vue";

export default {
  name: "MobileLogin",
  components: {
    Login,
  },
  data() {
    return {
      state: false,
    };
  },
  methods: {
    alter() {
      this.state ? this.state = false : this.state = true
    }
  }
};
</script>

<style scoped>
</style>
