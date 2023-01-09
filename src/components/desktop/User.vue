<template>
  <div>
      <Header @changePanel="changePanel" user="user"/>
      <div v-if="userLogs.length">
        <History :userLogs="userLogs" :userEmail="userEmail"/>
      </div>
      <div v-else>
        <h2>No data for the user</h2>
      </div>
  </div>
</template>

<script>
import Header from "./content/Header.vue";
import History from "./content/user/History.vue";
import getAllLogs from "./../../requests/getAllLogs";
import { useCookies } from "vue3-cookies";

export default {
  name: "UserMain",
  emits: ["logOut"],
  components: {
    Header,
    History
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      userLogs: [],
      userEmail: ""
    };
  },
  methods: {
    changePanel(status) {
			if (status === 10) {
				this.cookies.remove("user")
				this.$emit("logOut")
			}
    }
  },
  async mounted() {
    let result = await getAllLogs();
    let userId  = this.cookies.get("user").id
    this.userLogs = result.data.filter((log) => log.customerID == userId)
    this.userEmail = this.cookies.get("user").email
  }
};
</script>

<style scoped>
@import '@/../node_modules/leaflet/dist/leaflet.css';

</style>
