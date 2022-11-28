<template>
  <Desktop />
  <Mobile />
</template>

<script>
import Desktop from './components/Desktop.vue'
import Mobile from './components/Mobile.vue'

export default {
  name: 'App',
  components: {
    Desktop,
    Mobile
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: rgb(36, 36, 36);
}
</style>
