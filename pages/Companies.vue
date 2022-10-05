<template>
  <div>
    <p v-if="$fetchState.pending">
      <span class="loading"></span>
    </p>
    <p v-else-if="$fetchState.error">Error while fetching Companies</p>
    <div v-else>
      <div v-for="company in companies" :key="company">
        
        <h5>  Company Name : {{company.name}}</h5>
        <table  >
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
          <tr v-for="address in company.addresses" :key="address">
            <td>
               {{ address.firstName }}
           </td>
           <td>
               {{ address.lastName }}
           </td>
           <td>
               {{ address.city }}
           </td>
           <td>
               {{ address.state }}
           </td>
           <td>
               {{ address.country }}
           </td>
         </tr>
        </table>
     </div>

     <div>&nbsp;</div>
     <div>&nbsp;</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companies: []
    }
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },

  async fetch() {
    let data= await this.$http.$get('https://ms-company-f4b4o225iq-ue.a.run.app/?page=1&perPage=20&sortDirection=asc')

    this.companies =data.results;
  }
}
</script>
<style scoped>

table, th, td {
  border: 1px solid black;
}
li {
  margin-bottom: 0.5rem;
}
li:first-letter {
  text-transform: uppercase;
}
.loading {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 4px solid rgba(9, 133, 81, 0.705);
  border-radius: 50%;
  border-top-color: #158876;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
