<template>
  <Register v-if="state" @alter="alter" />
  <Login v-else @alter="alter" @onLogIn="onLogIn" @skip="skip" />
</template>

<script>
import Login from "./lib/Login.vue";
import Register from "./lib/Register.vue";
import { useCookies } from "vue3-cookies";
import loginUser from "./../../requests/login";
import swal from 'sweetalert';


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
    async onLogIn(email, pwd) {
      try {
        let result = await loginUser(email, pwd);
        this.checkToken(result.email, result.id, result.accessToken);
      } catch(err) {
        swal("Wrong email or password, try again...")
      }
    },
    checkToken(email, id, token) {
      if (token) {
        this.cookies.set("user", {email: email, id: id, token: token});
        this.$emit('logIn')
      } else {
        swal("Wrong email or password")
      }
    },
    skip() {
      this.$emit("skip")
    }
  },
  async mounted() {
    if (this.cookies.get("GitHubUser")) {
      let result = await loginUser(this.cookies.get("GitHubUser"), process.env.VUE_APP_GITHUBPWD);
      this.cookies.remove("GitHubUser")
      this.checkToken(result.email, result.id, result.accessToken);
    }
  },

};
</script>

<style scoped>
</style>
