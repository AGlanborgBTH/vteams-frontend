<template>
  <Map v-if="selected" :city="city" />
  <Select v-else @select="onSelect" />
</template>

<script>
import Map from "./lib/Map.vue"
import Select from "./lib/Select.vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
  name: "MobileMain",
  components: {
    Map,
    Select,
  },
  data() {
    return {
      selected: false,
      city: "",
    };
  },
  methods: {
    onSelect(id) {
      this.city = id
      this.selected = true
      cookies.set("city", id)
    }
  }
};
</script>

<style scoped>
</style>
