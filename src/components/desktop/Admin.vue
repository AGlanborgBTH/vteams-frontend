<template>
  <div>
    <Header @changePanel="changePanel" />
    <AdminScooters v-if="panel == 1" />
    <AdminUsers v-if="panel == 2" />
  </div>
</template>

<script>
import Header from "./content/Header.vue";
import AdminScooters from "./content/admin/manageScooters.vue";
import AdminUsers from "./content/admin/manageUsers.vue";
import { useCookies } from "vue3-cookies";

export default {
  name: "AdminMain",
  emits: ["logOut"],
  components: {
    Header,
    AdminScooters,
    AdminUsers,
  },
  data() {
    return {
      panel: 1,
    };
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  methods: {
    changePanel(status) {
      if (status === 10) {
        this.cookies.remove("user");
        this.$emit("logOut");
      } else {
        this.panel = status;
      }
    },
  },
};
</script>