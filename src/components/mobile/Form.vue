<template>
  <Register v-if="state" @alter="alter" />
  <Login v-else @alter="alter" @logIn="logIn" />
</template>

<script>
import Login from "./lib/Login.vue";
import Register from "./lib/Register.vue";
import { useCookies } from "vue3-cookies";
import getUser from "./../../requests/login";

export default {
  name: "MobileLogin",
  components: {
    Login,
    Register,
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
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

    async logIn(email, pwd) {
      let result = await getUser(email, pwd);
      let accessToken = result.accessToken;

      if (result.accessToken) {
        this.cookies.set("access-token", accessToken);
        this.$emit('inlog')
      } else {
        this.emit("logIn")
      }
    }

  }
};
</script>

<style scoped>
</style>
