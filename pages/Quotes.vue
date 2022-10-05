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
            <th> Quote Number</th>
            <th> Quote State</th>
            <th> Company Name</th>
            <th> Employee Email</th>
            <th> Total Price</th>
        </tr>
          <tr v-for="quotes in quotes.results" :key="quotes" style="border: solid;">
            <td>
              <a :href="'/q/' + quotes.id">{{ quotes.quoteNumber}}</a>
            </td>
            <td>
              {{ quotes.quoteState}}
            </td>
            <td>
              {{ quotes.company.name }}
            </td>
            <td>
              {{ quotes.employeeEmail}}
            </td>
            <td>
              <p v-if="quotes.totalPrice"> 
                {{ quotes.totalPrice.centAmount/100 }}
              </p>
              <p v-else>
                $0
              </p>
            </td>
          </tr>
        </table>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
          <a class="button" :href="'/addquote'">Add New Quote</a>
      </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'

const ALL_QUOTES_QUERY = gql`
query GET_ALL_QUOTES{
  quotes{
    count
    total
    results{
      id
      employeeEmail
      quoteState
      quoteNumber
      percentageDiscount
      totalPrice{
        centAmount,
        currencyCode
      }
      company{
        id,
        name
      }
    }
  }
}
`;
export default {
  apollo: {
    quotes: {
      query: ALL_QUOTES_QUERY,
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

  .button {
    border: 2px solid #04AA6D;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-left: 20px;
    color: blue;
  }

  .button:hover  {
    background-color: #04AA6D;
  }
</style>
