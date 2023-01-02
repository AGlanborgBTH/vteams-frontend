<template>
	<Header />
	<div>
		<header class="header">
			<!-- add a header element to hold the h1 and dropdown elements -->
			<!-- add the h1 element with the text "Admin panel" -->
			<h1 class="text-center">Admin panel</h1>
		</header>
		<div class="centerDiv">
			<label for="city-select">Select a city:</label>
			<select
				class="form-control"
				id="city-select"
				v-model="selectedCity"
				@click="filteredData(selectedCity)"
			>
				<option
					value="6384bb54079e5520699909d6"
					:selectedCity="selectedCity === '6384bb54079e5520699909d6'"
				>
					Göteborg
				</option>
				<option value="6384bb98897c01a69121c994">Uppsala</option>
				<option value="6384bbce2396b44a4a70ba3e">Linköping</option>
			</select>
		</div>
		<table class="logs-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Status</th>
					<th>City</th>
					<th>Battery</th>
					<th>Location</th>
					<th>Actions</th>
					<!-- add a new column for the buttons -->
				</tr>
			</thead>
			<tbody>
				<tr v-for="scooter in scooters" :key="scooter._id">
					<td>{{ scooter.name }}</td>
					<!-- use the v-if directive to conditionally set the background color of the table cell based on the value of the description field -->
					<td
						:style="{
							backgroundColor:
								scooter.inUse === 'false'
									? '#00ff00'
									: '#ff0000',
						}"
					>
						{{ scooter.inUse }}
					</td>
					<td>
						<!-- use the v-if directive to test the value of log.cityID and display different text based on the result -->
						<template
							v-if="scooter.cityID === '6384bb54079e5520699909d6'"
							>Göteborg</template
						>
						<template
							v-else-if="
								scooter.cityID === '6384bb98897c01a69121c994'
							"
							>Uppsala</template
						>
						<template v-else>Linköping</template>
					</td>
					<td>{{ scooter.battery }}%</td>
					<td>
						{{ scooter.location }}
					</td>

					<td>
						<!-- add the buttons with the icons -->
						<div class="btn-group">
							<button
								class="btn btn-primary buttonclicked"
								@click="ToParkingStation(scooter._id)"
							>
								<i class="fa fa-trash"></i>
							</button>
							<button
								class="btn btn-danger buttonclicked"
								@click="ToChargingStation(scooter._id)"
							>
								<i class="fa fa-trash"></i>
								<!-- use a font-awesome icon for the trash can -->
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Header from "./content/Header.vue";
import axios from "axios";
import ToParkingStation from "@/requests/sendParking.js";
import ToChargingStation from "@/requests/sendCharging.js";
import getAddressFromLatLng from "@/requests/getAdressAdmin.js";

export default {
	name: "AdminMain",
	components: {
		Header,
	},
	data() {
		return {
			adress: "",
			selectedCity: "",
			scooters: [], // this will hold the logs data that we fetch from the API
			error: null, // this will hold any error message that may occur during the request
		};
	},
	async mounted() {
		this.fetchScooters(); // call the fetchLogs function when the component is mounted
	},
	methods: {
		filteredData(selectedCity) {
			console.log(selectedCity);
		},
		async getAddressFromLatLng() {
			await getAddressFromLatLng();
		},
		async ToChargingStation(scooterId) {
			await ToChargingStation(scooterId);
		},
		async ToParkingStation(scooterId) {
			await ToParkingStation(scooterId);
		},
		async fetchScooters() {
			try {
				// make a GET request to the API to fetch the logs
				const response = await axios.get(
					"http://localhost:3000/v1/scooters/"
				);
				this.scooters = response.data.data; // update the logs data with the response from the API
			} catch (error) {
				this.error = error.message; // update the error message if an error occurs during the request
			}
		},
	},
	computed: {},
};
</script>

<style scoped>
.centerDiv {
	display: flex;
	justify-content: center;
	top: 0;
	left: 0;
	right: 0;
}
.btn + .btn {
	margin-left: 1rem; /* set the margin-left property to 1rem to add space between the buttons */
}
.form-control {
	width: 150px;
	height: 20px;
	margin-bottom: 20px;
}
.header {
	display: flex;
	justify-content: center;
	top: 0;
	left: 0;
	right: 0;
}
.btn:hover .fa {
	color: #ddd;
}
.btn:active {
	color: #ccc;
	transform: scale(0.9);
}
.btn-group {
	display: flex;
	justify-content: center;
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
