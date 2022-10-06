<template>
  <div>
    <!-- <p v-if="$fetchState.pending">
      <span class="loading"></span>
    </p>
    <p v-else-if="$fetchState.error">Error while fetching mountains 🤬</p> -->
    <div v-if="$apollo.loading" class="loading">
    </div>
      <div v-else>
        <table >
          <tr>
            <th> First Name</th>
            <th> Last Name</th>
            <th> Employee Email</th>
            <th> Company Name</th>
            <th> Amount Expended</th>
            <th> Shipping Address</th>
        </tr>
          <tr v-for="employee in employees.results" :key="employee" style="border: solid;">
            <td>
              <a :href="'/q/' + employee.id">{{ employee.firstName}}</a>
            </td>
            <td>
              {{ employee.lastName}}
            </td>
            <td>
              {{ employee.email }}
            </td>
            <td>
              {{ employee.companyName}}
            </td>
            <td>
              <p v-if="employee.amountExpended"> 
                {{ employee.amountExpended.centAmount/100 }} - {{employee.amountExpended.currencyCode}}
              </p>
              <p v-else>
                $0
              </p>
            </td>
            <td>
              <span class="address" @click="showModal(employee.id)">
                Address
              </span>
                <Modal
                  v-show="isModalVisible === employee.id"
                  @close="closeModal"
                >
                  <template v-slot:header>
                    Shipping Address
                  </template>
                  <template v-slot:body>
                    <div><span>First Name</span> : 
                      <span v-if="employee.defaultShippingAddress && employee.defaultShippingAddress.firstName">
                        {{employee.defaultShippingAddress.firstName}}
                      </span>
                    </div>
                    <div><span>Last Name</span> : 
                      <span v-if="employee.defaultShippingAddress && employee.defaultShippingAddress.lastName">
                        {{employee.defaultShippingAddress.lastName}}
                      </span>
                    </div>
                    <div><span>Street Name</span> : 
                      <span v-if="employee.defaultShippingAddress && employee.defaultShippingAddress.streetName">
                        {{employee.defaultShippingAddress.streetName}}
                      </span>
                    </div>
                    <div><span>City</span> : 
                      <span v-if="employee.defaultShippingAddress && employee.defaultShippingAddress.city">
                        {{employee.defaultShippingAddress.city}}
                      </span>
                    </div>
                    <div><span>Country</span> : 
                      <span v-if="employee.defaultShippingAddress && employee.defaultShippingAddress.country">
                        {{employee.defaultShippingAddress.country}}
                      </span>
                    </div>
                  </template>
                  <template v-slot:footer>

                  </template>
                </Modal>
            </td>
          </tr>
        </table>

        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
          
      </div>
  </div>
</template>
<script>
import Modal from '../components/Modal.vue'
import gql from 'graphql-tag'


const ALL_EMPLOYEES_QUERY = gql`
query ALL_EMPLOYEES_QUERY($limit:Int,$offset:Int){
  employees(limit:$limit,offset:$offset){
    count
    total
    results{
      id
      employeeNumber
      email
      firstName
      lastName
      companyName
      amountExpended{
        centAmount
        currencyCode
      }
      addresses{
        title
        streetName
        firstName
      }
      defaultShippingAddress{
        firstName
        lastName
        streetName
        city
        country
      }
    }
  }
}
`;
export default {
  components: {
      Modal,
    },
    data() {
      return {
        isModalVisible: false,
      };
    },
    methods: {
      showModal(id) {
        this.isModalVisible = id;
      },
      closeModal() {
        this.isModalVisible = "";
      }
    },
  apollo: {
    employees: {
      query:ALL_EMPLOYEES_QUERY,
      varibles:{"limit": 10,"offset": 0},
      prefetch: true,
    },
  },
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

p {
    margin-top: 0px;
    margin-bottom: 0px;
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

  a:link {
    color: blue;
  }

  a:visited {
    color: blue;
  }

  a:hover  {
    color: red;
  }

  .address {
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin-left: 20px;
    color: blue;
    cursor: pointer; 
  }

  .address:hover  {
    color: red;
  }
</style>
