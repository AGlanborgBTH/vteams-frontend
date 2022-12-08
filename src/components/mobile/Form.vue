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
      let result = await loginUser(this.cookies.get("GitHubUser"), "github forever");
      this.cookies.remove("GitHubUser")
      if (result.accessToken) {
        this.cookies.set("user", {email: result.Email, id: result.id, token: result.accessToken});
        this.$emit('inlog')
      } else {
        this.emit("logIn")
      }
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

      if (result.accessToken) {
        this.cookies.set("user", {email: result.Email, id: result.id, token: result.accessToken});
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
