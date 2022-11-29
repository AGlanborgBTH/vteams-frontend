<template>
  <Mobile v-if="mobile" />
  <Desktop v-else />
</template>

<script>
import Desktop from './components/Desktop.vue'
import Mobile from './components/Mobile.vue'
import detectMob from '@/lib/mobile'

export default {
  name: 'App',
  components: {
    Desktop,
    Mobile
  },
  data() {
    return {
      mobile: false
    }
  },
  mounted() {
    this.mobile = detectMob()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Tienne&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: rgb(36, 36, 36);
  color: rgb(255, 255, 255);
  font-family: 'Tienne', 'serif';
}

input {
  color: rgb(225, 255, 255);
  font-family: 'Tienne', 'serif';
}
</style>
