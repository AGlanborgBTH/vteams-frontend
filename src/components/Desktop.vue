<template>
  <div>
    <Admin v-if="state == 1" @logOut="logOut" />
    <Form v-if="state == 2" @logIn="logIn" />
    <User v-if="state == 3" @logOut="logOut" />
  </div>
</template>

<script>
import Admin from "./desktop/Admin.vue";
import Form from "./desktop/Form.vue";
import User from "./desktop/User.vue";

export default {
  name: "DesktopMain",
  components: {
    Admin,
    Form,
    User,
  },
  data() {
    return {
      state: 2,
    };
  },
  methods: {
    logIn(adm) {
      if (adm) {
        this.state = 1;
      } else {
        this.state = 3;
      }
    },
    logOut() {
      this.state = 2;
    },
  },
};
</script>

<style scoped>
</style>
