<template>
  <div>
    <div class="tbHeader">
      <h1 class="text-center">Rental history for the user: {{ userEmail }}</h1>
    </div>
    <table class="logs-table">
      <tr>
        <th>City</th>
        <th>Scooter</th>
        <th>Started renting</th>
        <th>Stopped renting</th>
        <th>Location started</th>
        <th>Location stopped</th>
        <th>Cost</th>
      </tr>
      <tr v-for="log in userLogs" :key="log._id">
        <td v-if="log.cityID === '6384bb54079e5520699909d6'">Göteborg</td>
        <td v-else-if="log.cityID === '6384bb98897c01a69121c994'">Uppsala</td>
        <td v-else>Linköping</td>
        <td>{{ log.scooterName }}</td>
        <td>{{ this.convertToDate(log.timeStart) }}</td>
        <td>{{ this.convertToDate(log.timeEnd) }}</td>
        <td>{{ log.locationStart }}</td>
        <td>{{ log.locationEnd }}</td>
        <td>{{ log.totalCost }} kr</td>
      </tr>
    </table>
  </div>
</template>

<script>
import getAddressGoogle from "./../../../../requests/getAdressGoogleAPI";
import { toRaw } from "vue";

export default {
  name: "HistoryMain",
  props: ["userLogs", "userEmail"],
  methods: {
    convertToDate(miliseconds) {
      let date = new Date(+miliseconds).toLocaleString("sv");
      return date;
    },
    async getAddress(location) {
      let data = toRaw(location);
      let address = await getAddressGoogle(data);
      let addressReadable;
      address.results.forEach((part) => {
        if (part.types.includes("postal_code")) {
          addressReadable = part.formatted_address;
        }
      });
      return addressReadable;
    },
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
</style>