<template>
  <Register v-if="state" @alter="alter" />
  <Login v-else @alter="alter" @logIn="logIn" />
</template>

<script>
import Login from "./lib/Login.vue";
import Register from "./lib/Register.vue";
import { useCookies } from "vue3-cookies";
import loginUser from "./../../requests/login";

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

  async mounted() {
    if (this.cookies.get("GitHubUser")) {
      let result = await loginUser(this.cookies.get("GitHubUser"), process.env.VUE_APP_GITHUBPWD);
      this.cookies.remove("GitHubUser")
      this.checkToken(result.Email, result.id, result.accessToken);
    }
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
      let result = await loginUser(email, pwd);
      this.checkToken(result.Email, result.id, result.accessToken);
    },

    checkToken(email, id, token) {
      if (token) {
        this.cookies.set("user", {email: email, id: id, token: token});
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
