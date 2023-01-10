<template>
  <Select v-if="state == 0" @select="onSelect" />
  <Map
    v-else-if="state == 1"
    @profile="onProfile"
    @change="onChange"
    :city="city"
  />
  <Profile v-else-if="state == 2" @map="onMap" />
</template>

<script>
import Map from "./lib/Map.vue";
import Select from "./lib/Select.vue";
import Profile from "./lib/Profile.vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
  name: "MobileMain",
  components: {
    Map,
    Select,
    Profile,
  },
  data() {
    return {
      state: 0,
      city: "",
    };
  },
  methods: {
    onSelect(id) {
      this.city = id;
      this.state = 1;
      cookies.set("city", id);
    },
    onMap() {
      this.state = 1;
    },
    onProfile() {
      this.state = 2;
    },
    onChange() {
      this.state = 0;
    },
  },
};
</script>

<style scoped>
</style>
