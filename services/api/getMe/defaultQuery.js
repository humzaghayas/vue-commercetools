const gql =require ('graphql-tag');
const { CartFragment, CustomerFragment } = require ('@vue-storefront/commercetools-api');

const basicProfile = gql`
  ${CartFragment}

  query getBasicProfile($locale: Locale!, $acceptLanguage: [Locale!], $currency: Currency!) {
    me {
      activeCart {
        ...DefaultCart
        custom{
          customFieldsRaw{
            name
            value
          }
        }
        customer{
          email
          id
        }
      }
    }
  }
`;

const fullProfile = gql`
  ${CartFragment}
  ${CustomerFragment}

  query getFullProfile($locale: Locale!, $acceptLanguage: [Locale!], $currency: Currency!) {
    me {
      activeCart {
        ...DefaultCart
        custom{
          customFieldsRaw{
            name
            value
          }
        }
      }
      customer {
        id
        ...DefaultCustomer
      }
    }
  }
`;

//{currency:"USD",country:"US"}
const CREATE_MY_CART_MUTATION =gql`
${CartFragment}

mutation($draft:MyCartDraft!,$locale: Locale!, $acceptLanguage: [Locale!], $currency: Currency!){
	createMyCart(draft:$draft){
    customerId
    ...DefaultCart
  }
}
`;
module.exports= { basicProfile, fullProfile,CREATE_MY_CART_MUTATION };
