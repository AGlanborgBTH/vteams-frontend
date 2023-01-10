<template>
  <Select v-if="state == 0" @select="onSelect" />
  <Map
    v-else-if="state == 1"
    @profile="onProfile"
    @change="onChange"
    @about="onAbout"
    @contact="onContact"
    :city="city"
  />
  <Profile v-else-if="state == 2" @map="onMap" />
  <About v-else-if="state == 3" @map="onMap" />
  <Contact v-else-if="state == 4" @map="onMap" />
</template>

<script>
import Map from "./lib/Map.vue";
import Select from "./lib/Select.vue";
import Profile from "./lib/Profile.vue";
import About from "./lib/About.vue"
import Contact from "./lib/Contact.vue"
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
  name: "MobileMain",
  components: {
    Map,
    Select,
    Profile,
    About,
    Contact
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
    onAbout() {
      this.state = 3
    },
    onContact() {
      this.state = 4
    }
  },
};
</script>

<style scoped>
</style>
