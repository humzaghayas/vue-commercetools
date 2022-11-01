const gql =require ('graphql-tag');
const { CartFragment } = require ('@vue-storefront/commercetools-api');

const ADD_TO_CART = gql`
  ${CartFragment}

  mutation updateCart(
    $id: String!,
    $version: Long!,
    $actions: [CartUpdateAction!]!,
    $locale: Locale!,
    $acceptLanguage: [Locale!],
    $currency: Currency!,
    $storeKey: KeyReferenceInput
  ) {
    cart: updateCart(id: $id, version: $version, actions: $actions, storeKey: $storeKey) {
      ...DefaultCart
    }
  }
`;

module.exports= { ADD_TO_CART };