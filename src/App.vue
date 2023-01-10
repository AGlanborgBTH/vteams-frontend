<template>
  <Mobile v-if="mobile" />
  <Desktop v-else />
</template>

<script>
import Desktop from './components/Desktop.vue'
import Mobile from './components/Mobile.vue'
import detectMob from '@/lib/mobile'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

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
    cookies.remove("city")
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
button,
textarea {
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

.popup .leaflet-popup-content-wrapper, .leaflet-popup-tip {
  background: rgba(46, 59, 97, 0.9);
  color: white;
  text-align: center;
}

.popup .leaflet-popup-content {
  width: 200px;
}

.popupButton {
  background-color: #5429FF;
  border: 1px solid #5429FF;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  padding: 7px;
  text-align: center;
}

.popupUpper {
  display: flex;
  align-items: center;
  justify-content: center
}

.batteryIcon {
  height: 12px;
  padding-right: 5px;
}

.verLineIcon {
  padding-left: 12px;
}

.scooterName {
  padding-left: 20px;
}

.horLineIcon {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

</style>
