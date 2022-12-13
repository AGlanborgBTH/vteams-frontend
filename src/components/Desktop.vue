<template>
  <Admin v-if="state == 1" />
  <Form v-if="state == 2" />
  <User v-if="state == 3" />
</template>

<script>
import Admin from './desktop/Admin.vue'
import Form from './desktop/Form.vue'
import User from './desktop/User.vue'

export default {
  name: 'DesktopMain',
  components: {
    Admin,
    Form,
    User
  },
  data() {
    return {
      state: 2
    }
  }
}
</script>

<style scoped>

</style>
