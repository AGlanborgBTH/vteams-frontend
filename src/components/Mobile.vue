<template>
  <Login />
  <Main />
</template>

<script>
import Login from './mobile/Login.vue'
import Main from './mobile/Main.vue'

export default {
  name: 'MobileMain',
  components: {
    Login,
    Main
  }
}
</script>

<style scoped>
</style>
