<template>
  <Form v-if="state" title="Register" excerpt="Register to create a profile" submit="Register" />
  <Form v-else title="Login" excerpt="Login to access your profile" submit="Sign in" />
</template>

<script>
import Form from './lib/Form.vue'

export default {
  name: 'MobileLogin',
  components: {
    Form
  },
  data () {
    return {
      state: false
    }
  }
}
</script>

<style scoped>
</style>
