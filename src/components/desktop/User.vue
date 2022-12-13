<template>
  <Header />
</template>

<script>
import Header from "./lib/Header.vue";
import map from '@/lib/map.js'

export default {
  name: "UserMain",
  components: {
    Header,
  },
  mounted() {
    map()
  },
};
</script>

<style scoped>
@import '@/../node_modules/leaflet/dist/leaflet.css';

#map {
  height: 100vh;
  width: 100vw;
}
</style>
