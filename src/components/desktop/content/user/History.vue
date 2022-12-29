<template>
    <div>
        <h1>users history</h1>
        <table>
          <tr>
            <th> City </th>
            <th> Scooter </th>
            <th> Started renting </th>
            <th> Stopped renting </th>
            <th> Location started </th>
            <th> Location stopped </th>
            <th> Cost </th>
          </tr>
          <tr v-for="log in userLogs" :key="log._id">
            <td v-if="log.cityID === '6384bb54079e5520699909d6'"> Göteborg </td>
            <td v-else-if="log.cityID === '6384bb98897c01a69121c994'"> Uppsala </td>
            <td v-else>Linköping</td>
            <td> {{ log.scooterName }} </td>
            <td> {{ this.convertToDate(log.timeStart) }} </td>
            <td> {{ this.convertToDate(log.timeEnd) }} </td>
            <td> {{ this.getAddress(log.locationStart) }} </td>
            <td> {{ log.locationEnd }} </td>
            <td> {{ log.totalCost }} kr</td>
          </tr>
        </table>
    </div>
</template>

<script>
import getAddressGoogle from './../../../../requests/getAdressGoogleAPI';
import { toRaw } from 'vue';


export default {
  name: "HistoryMain",
  props: ['userLogs'],
  methods: {
    convertToDate(miliseconds) {
      let date = new Date(+miliseconds).toLocaleString('sv')
      return date;
    },
    async getAddress(location) {
      let data = toRaw(location)
      let address = await getAddressGoogle(data)
      console.log(address.results, "inne")
      let addressReadable;
      address.results.forEach( part => {
        if(part.types.includes('postal_code')) {
          addressReadable = part.formatted_address
          console.log(addressReadable)
        }
      })
      console.log(addressReadable);
    }
  }
}

</script>

<style scoped>
td {
  padding: 15px;
  text-align: left;
}
th {
  background-color: rgba(84, 41, 255);
  color: white;
  padding: 15px;
  text-align: left;
}
</style>