<template>
  <Form
    v-if="state"
    @alter="alter"
    title="Register"
    excerpt="Register to create a profile"
    sup="0"
    submit="Register"
    footer="Already have an account?"
    alt="Log in"
  />
  <Form
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
import Form from "./lib/Form.vue";

export default {
  name: "MobileLogin",
  components: {
    Form,
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
