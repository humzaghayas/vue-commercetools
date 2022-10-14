<template>
    <div>
      <div v-if="$apollo.loading" class="loading">
        </div>
      <div v-else>
        <h1>Employee Details</h1>
  
        <!-- <div class="right" v-if="quote.quoteState === 'initial' || quote.quoteState === 'submitted'">
          <span class="handMouseOver" @click="updateQuoteStatus('submitted',quote.id,quote.version)" v-if="quote.quoteState === 'initial'">
            Submit
          </span>
          <span class="handMouseOver" @click="updateQuoteStatus('approved',quote.id,quote.version)" v-else-if="quote.quoteState === 'submitted'">
            Activate
          </span>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span class="handMouseOver" @click="updateQuoteStatus('declined',quote.id,quote.version)">Decline</span>
        </div> -->
      
      <div>&nbsp;</div>
      <a :href="'/employees'">Back To Employees</a>
      <div>&nbsp;</div>
      <table style="width:500px">
        <tr>
          <td valign="top">
                <div>
                   <h5>Salutation</h5>
                    {{employee.salutation}}
                </div>
          </td>

          <td valign="top">
                <div>
                   <h5>Vat Id</h5>
                    {{employee.vatId}}
                </div>
          </td>

          <td valign="top">
                <div>
                   <h5>Amount Extended</h5>
                    {{employee.amountExpended.centAmount/100}}
                </div>
          </td>

          <td valign="top">
                <div>
                   <h5>Title</h5>
                    {{employee.title}}
                </div>
          </td>

          <td valign="top">
                <div>
                   <h5>Email State</h5>
                    <p v-if="employee.isEmailVerified">
                        Verified
                    </p>
                    <p v-else>
                        Not Verified
                    </p>
                </div>
          </td>
        </tr>
    <tr v-for="address in employee.addresses">
        <th>Address</th>
          <td valign="top">
                <div>
                   <h5>Street Name</h5>
                    {{address.streetName}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>Street Number</h5>
                    {{address.streetNumber}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>Region</h5>
                    {{address.region}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>City</h5>
                    {{address.city}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>State</h5>
                    {{address.state}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>Country</h5>
                    {{address.country}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>Postal Code</h5>
                    {{address.postalCode}}
                </div>
          </td>
          <!-- <tr v-if="address.contactInfo">
            <td valign="top">
                <div>
                   <h5>Phone</h5>
                    {{address.contactInfo.phone}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>Mobile</h5>
                    {{address.contactInfo.mobile}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>Email</h5>
                    {{address.contactInfo.email}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>Fax</h5>
                    {{address.contactInfo.fax}}
                </div>
          </td>
          </tr> -->
    </tr>
    </table>
  
    <div>
      <h5>Employee</h5>
      <div>
        <p>
          Employee Email: {{employee.email}}
        </p>
        <p>
          Company Name: {{employee.companyName}}
        </p>
      </div>
    </div>
    <div>&nbsp;</div>
  </div>
    </div>
  </template>
  <script>
  
  import {EMPLOYEE_BY_ID_QUERY} from '../../graphql/queries/quotesQueries'
  import SfAccordion from '@storefront-ui/vue/src/components/organisms/SfAccordion/SfAccordion.vue';

  
  export default {
      async asyncData({ app, params ,loading}) {
          const client = app.apolloProvider.defaultClient;
          const { employeeId } = params;
          const res = await client.query({
              query: EMPLOYEE_BY_ID_QUERY,
              variables: {
                  id: employeeId
              },
          });
          const { employee } = res.data;
          return {
              employee,
          };
      },
      components: { SfAccordion }
  }
    </script>
  
  <style scoped>
  
  .rheight{
    height: 20px;
  }
    .line{
      border-top: 5px solid black;
    }
    .left {
      float: left;
      width: 200px;
      margin: auto;
      border: 3px solid gray;
    }
  
    h5 {
      margin-top: 2px;
      margin-bottom: 2px;
    }
  
    p {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    .right {
      display: block;
      float: right;
      width: 150px;
      border: 3px solid gray;
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
  
    .handMouseOver {
       cursor: pointer; 
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
    </style>