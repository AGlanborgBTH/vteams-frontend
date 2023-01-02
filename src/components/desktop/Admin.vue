<template>
	<div>
			<Header @changePanel="changePanel"/>
			<AdminScooters v-if="panel == 1"/>
			<AdminUsers v-if="panel == 2" />
	</div>
</template>

<script>
import Header from "./content/Header.vue"
import AdminScooters from "./content/admin/manageScooters.vue"
import AdminUsers from "./content/admin/manageUsers.vue"

export default {
	name: 'AdminMain',
	components: {
		Header,
		AdminScooters,
		AdminUsers
	},
	data() {
    return {
      panel: 1
    }
  },
	methods: {
    changePanel(status) {
			this.panel = status
    }
  }
}
</script>