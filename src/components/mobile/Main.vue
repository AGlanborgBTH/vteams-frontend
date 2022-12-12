<template>
  <Map v-if="selected" :city="city" />
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
      city: "",
    };
  },
  methods: {
    onSelect(id) {
      this.city = id
      this.selected = "temp"
    }
  }
};
</script>

<style scoped>
</style>
