<template>
  <div>
		<div class="tbHeader">
			<h1 class="text-center">Scooters in the system</h1>
		</div>
		<div class="centerDiv">
			<label for="city-select">Select a city:</label>
			<select
				class="form-control"
				id="city-select"
				v-model="selectedCity"
				@click="fetchScooters()"
			>
				<option
					value="Göteborg"
					:selectedCity="selectedCity === 'Göteborg'"
				>
					Göteborg
				</option>
				<option
					value="Uppsala"
					:selectedCity="selectedCity === 'Uppsala'"
				>
					Uppsala
				</option>
				<option
					value="Linköping"
					:selectedCity="selectedCity === 'Linköping'"
				>
					Linköping
				</option>
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
				<tr v-for="scooter in scootersFilter" :key="scooter._id">
					<td>{{ scooter.name }}</td>
					<!-- use the v-if directive to conditionally set the background color of the table cell based on the value of the description field -->
					<td v-if="scooter.status == 'Available'" class="available">
						{{ scooter.status }}
					</td>
					<td v-else class="notavailable">
						{{ scooter.status }}
					</td>
					<td>
						<div v-if="scooter.city === 'Göteborg'">Göteborg</div>
						<div v-else-if="scooter.city === 'Uppsala'">
							Uppsala
						</div>
						<div v-else>Linköping</div>
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
								@click="ToParkingStation(scooter.status, scooter._id)"
							>
							Park
							</button>
							<button
								class="btn btn-primary buttonclicked"
								@click="ToChargingStation(scooter.status, scooter._id)"
							>
								Charge
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from "axios";
import ToParkingStation from "@/requests/sendParking.js";
import ToChargingStation from "@/requests/sendCharging.js";
import getAddressFromLatLng from "@/requests/getAdressAdmin.js";
import swal from 'sweetalert';

export default {
	name: "AdminScooters",
	data() {
		return {
			adress: "",
			selectedCity: "Göteborg",
			scooters: [],
			scootersFilter: [], // this will hold the logs data that we fetch from the API
			error: null, // this will hold any error message that may occur during the request
		};
	},
	async mounted() {
		this.fetchScooters(); // call the fetchLogs function when the component is mounted
	},
	methods: {
		async getAddressFromLatLng() {
			await getAddressFromLatLng();
		},
		async ToChargingStation(status, scooterId) {
			if (status != "Unavailable") {
				await ToChargingStation(scooterId);
				this.fetchScooters();
			} else {
				swal("The scooter is in use! You cannot send it to charging.")
			}
		},
		async ToParkingStation(status, scooterId) {
			if (status != "Unavailable") {
				await ToParkingStation(scooterId);
				this.fetchScooters();
			} else {
				swal("The scooter is in use! You cannot send it to parking.")
			}
		},
		async fetchScooters() {
			try {
				// make a GET request to the API to fetch the logs
				const response = await axios.get(
					"http://localhost:3000/v1/scooters/"
				);
				this.scooters = response.data.data;
				this.scooters.filter(
					(scooter) => scooter.city === this.selectedCity
				);
				this.scootersFilter = this.scooters.filter(
					(scooter) => scooter.city === this.selectedCity
				);
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
.tbHeader {
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

.available{
  background-color:  #00ff00;
}

.notavailable {
  background-color: #ff0000;
}
</style>
