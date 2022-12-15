<template>
  <Mobile v-if="mobile" />
  <Desktop v-else />
</template>

<script>
import Desktop from './components/Desktop.vue'
import Mobile from './components/Mobile.vue'
import detectMob from '@/lib/mobile'
import SocketioService from './services/socketio.service.js';

export default {
  name: 'App',
  components: {
    Desktop,
    Mobile
  },
  created() {
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
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
  background-color: rgb(46, 59, 97);
  color: rgb(255, 255, 255);
  font-family: 'Tienne', 'serif';
}

input,
button {
  color: rgb(225, 255, 255);
  font-family: 'Tienne', 'serif';
}

.leaflet-left {
  right: 0;
  left: revert;
}

.leaflet-control {
  margin-right: 10px;
}
</style>
