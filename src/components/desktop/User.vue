<template>
  <Header />
</template>

<script>
import Header from "./content/Header.vue";

export default {
  name: "UserMain",
  components: {
    Header,
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
