<template>
  <Map v-if="selected" />
  <Select v-else @select="onSelect" />
</template>

<script>
import Map from "./lib/Map.vue"
import Select from "./lib/Select.vue";

export default {
  name: "MobileMain",
  components: {
    Map,
    Select,
  },
  data() {
    return {
      selected: "",
    };
  },
  methods: {
    onSelect() {
      this.selected = "temp"
    }
  }
};
</script>

<style scoped>
</style>
