<template>
	<Header />
	<div>
		<header class="header">
			<!-- add a header element to hold the h1 and dropdown elements -->
			<!-- add the h1 element with the text "Admin panel" -->
			<h1 class="text-center">Admin panel</h1>
			<!-- add a form group with a label and select element for the dropdown menu -->
			<div class="form-group text-center">
				<!-- add the text-center class to center the dropdown menu horizontally -->
				<label for="city-select">Select a city:</label>
				<select
					class="form-control"
					id="city-select"
					v-model="selectedCity"
				>
					<option value="6384bb54079e5520699909d6">Göteborg</option>
					<option value="6384bb98897c01a69121c994">Uppsala</option>
					<option value="6384bbce2396b44a4a70ba3e">Linköping</option>
				</select>
			</div>
		</header>
		<table class="logs-table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Description</th>
					<th>City</th>
					<th>Customer</th>
					<th>Scooter</th>
					<th>Time Start</th>
					<th>Time End</th>
					<th>Cost</th>
					<th>Actions</th>
					<!-- add a new column for the buttons -->
				</tr>
			</thead>
			<tbody>
				<tr v-for="log in logs" :key="log._id">
					<td>{{ log._id }}</td>
					<!-- use the v-if directive to conditionally set the background color of the table cell based on the value of the description field -->
					<td
						:style="{
							backgroundColor:
								log.description === 'Stop Renting Scooter'
									? '#ff0000'
									: '#00ff00',
						}"
					>
						{{ log.description }}
					</td>
					<td>
						<!-- use the v-if directive to test the value of log.cityID and display different text based on the result -->
						<template
							v-if="log.cityID === '6384bb54079e5520699909d6'"
							>Göteborg</template
						>
						<template
							v-else-if="
								log.cityID === '6384bb98897c01a69121c994'
							"
							>Uppsala</template
						>
						<template v-else>Linköping</template>
					</td>
					<td>{{ log.customerID }}</td>
					<td>{{ log.scooterID }}</td>
					<td>
						<!-- create a new Date object from the log.timeStart value and use the toLocaleDateString method to format the date -->
						{{ new Date(log.timeStart).toLocaleString("sv") }}
					</td>
					<td>
						<!-- create a new Date object from the log.timeStart value and use the toLocaleDateString method to format the date -->
						{{ new Date(log.timeEnd).toLocaleString("sv") }}
					</td>
					<td>{{ log.totalCost }}</td>
					<td>
						<!-- add the buttons with the icons -->
						<button class="btn btn-primary">
							<i class="fa fa-pencil"></i>
							<!-- use a font-awesome icon for the pencil -->
						</button>
						<button class="btn btn-danger">
							<i class="fa fa-trash"></i>
							<!-- use a font-awesome icon for the trash can -->
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Header from "./content/Header.vue";
import axios from "axios";

export default {
	name: "AdminMain",
	components: {
		Header,
	},
	data() {
		return {
			selectedCity: "",
			logs: [], // this will hold the logs data that we fetch from the API
			error: null, // this will hold any error message that may occur during the request
		};
	},
	mounted() {
		this.fetchLogs(); // call the fetchLogs function when the component is mounted
	},
	methods: {
		async fetchLogs() {
			try {
				// make a GET request to the API to fetch the logs
				const response = await axios.get(
					"http://localhost:3000/v1/logs"
				);
				this.logs = response.data.data; // update the logs data with the response from the API
			} catch (error) {
				this.error = error.message; // update the error message if an error occurs during the request
			}
		},
	},
};
</script>

<style scoped>
.header {
	display: flex;
	justify-content: center;
	top: 0;
	left: 0;
	right: 0;
}

.logs-table {
	width: 80%;
	border-collapse: collapse;
	background-color: #fff;
	margin: 0 auto;
}
.logs-table th,
.logs-table td {
	border: 1px solid #ddd;
	padding: 8px;
	color: #000;
}
.logs-table th {
	/* set the table header background color to a light gray */
	background-color: #f2f2f2;
}
.logs-table tr:nth-child(even) {
	/* set the background color of even rows to a light gray */
	background-color: #f9f9f9;
}
/* add some styles to the buttons */
.logs-table .btn {
	padding: 4px 8px;
	border: none;
	border-radius: 4px;
}
.logs-table .btn-primary {
	/* set the primary button background color to a light blue */
	background-color: #007bff;
	color: #fff;
}
.logs-table .btn-danger {
	/* set the danger button background color to a light red */
	background-color: #dc3545;
	color: #fff;
}
</style>
