<template>
  <div>
		<div class="tbHeader">
			<h1 class="text-center">Users in the system</h1>
		</div>
		<table class="logs-table">
			<thead>
				<tr>
					<th>Email</th>
          <th>Admin</th>
					<th>First name</th>
					<th>Second name</th>
					<th>Wallet</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user._id">
					<td>{{ user.email }}</td>
          <td v-if="user.adminstatus" class="admin"> YES </td>
          <td v-else class="user"> NO </td>
					<td> {{ user.firstname }} </td>
					<td>{{ user.surname }} </td>
					<td>
						{{ user.wallet }}
					</td>

					<td>
						<!-- add the buttons with the icons -->
						<div class="btn-group">
							<button
								class="btn btn-primary buttonclicked"
								@click="DeleteUser(user._id)"
							>
								<i class="fa fa-trash"></i>
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
import deleteOneUser from "./../../../../requests/deleteUser";

export default {
	name: "AdminUsers",
	data() {
		return {
			users: [],
			error: null, // this will hold any error message that may occur during the request
		};
	},
	async mounted() {
		this.fetchUsers();
	},
	methods: {
		async fetchUsers() {
			try {
				// make a GET request to the API to fetch the users
				const response = await axios.get(
					"http://localhost:3000/v1/users/"
				);
				this.users = response.data.data;
			} catch (error) {
				this.error = error.message; // update the error message if an error occurs during the request
			}
		},
    async DeleteUser(id) {
      await deleteOneUser(id)
			this.fetchUsers();
    }
	},
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

.admin{
  background-color:  #00ff00;
}

.user {
  background-color: #ff0000;
}
</style>
