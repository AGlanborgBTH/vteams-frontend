<template>
  <Admin />
  <Login />
  <User />
</template>

<script>
import Admin from './desktop/Admin.vue'
import Login from './desktop/Login.vue'
import User from './desktop/User.vue'

export default {
  name: 'DesktopMain',
  components: {
    Admin,
    Login,
    User
  }
}
</script>

<style scoped>

</style>
