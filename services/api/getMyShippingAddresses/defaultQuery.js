const gql =require ('graphql-tag');
const {  CustomerFragment } = require ('@vue-storefront/commercetools-api');

const UPDATE_CUSTOMER_MUTATION =gql`
${CustomerFragment}

mutation($version:Long!,$actions:[MyCustomerUpdateAction!]!){
  updateMyCustomer(version:$version,actions:$actions){
    ...DefaultCustomer
  }
}
`;

module.exports= {UPDATE_CUSTOMER_MUTATION };
