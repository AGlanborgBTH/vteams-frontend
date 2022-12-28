<template>
  <Login @onLogIn="onLogIn"/>
</template>

<script>
import Login from './content/Login.vue'
import { useCookies } from "vue3-cookies";
import loginUser from "./../../requests/login";
import swal from 'sweetalert';

export default {
  name: 'DesktopLogin',
  emits: ["logIn"],
  components: {
    Login
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
      if (email == "admin@admin.com" && pwd == "admin") {
        this.cookies.set("user", {admin: true});
        this.$emit('logIn', 1)
      } else {
        try {
          let result = await loginUser(email, pwd);
          this.checkToken(result.email, result.id, result.accessToken);
        } catch(err) {
          swal("Wrong email or password, try again...")
       }
      }
    },
    checkToken(email, id, token) {
      if (token) {
        this.cookies.set("user", {email: email, id: id, token: token});
        this.$emit('logIn', 0)
      } else {
        swal("Wrong email or password")
      }
    }
  },
  async mounted() {
    if (this.cookies.get("GitHubUser")) {
      let result = await loginUser(this.cookies.get("GitHubUser"), process.env.VUE_APP_GITHUBPWD);
      this.cookies.remove("GitHubUser")
      this.checkToken(result.email, result.id, result.accessToken);
    }
  },
}
</script>

<style scoped>
</style>
