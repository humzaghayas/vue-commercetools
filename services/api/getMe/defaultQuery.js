const gql =require ('graphql-tag');
const {AddressFragment,ShippingMethodFragment, CustomerFragment,ProductPriceFragment } = require ('@vue-storefront/commercetools-api');


// import {} from './address';
// import {} from './customer';
// import {LineItemFragment} from './line-item';
// import {} from './shipping-method';


const LineItemFragment = `
  ${ProductPriceFragment}

  fragment DefaultLineItem on LineItem {
    id
    productId
    name(acceptLanguage: $acceptLanguage)
    productSlug(acceptLanguage: $acceptLanguage)
    quantity
    discountedPricePerQuantity {
      quantity
      discountedPrice {
        value {
          centAmount
        }
        includedDiscounts {
          discount {
            name(acceptLanguage: $acceptLanguage)
            isActive
          }
        }
      }
    }

    custom{
      customFieldsRaw{
        value
        name
      }
    }
    variant {
      id
      sku
      price(currency: $currency) {
        tiers {
          value {
            centAmount
          }
        }
        value {
          centAmount
        }
        discounted {
          value {
            centAmount
          }
          discount {
            isActive
            name(acceptLanguage: $acceptLanguage)
          }
        }
      }
      images {
        url
        label
      }
      attributesRaw {
        name
        value
        attributeDefinition {
          type {
            name
          }
          label(locale: $locale)
        }
      }
    }
    price {
      ...DefaultProductPrice
    }
  }
`;



const CartFragment = gql`
  ${AddressFragment}
  ${CustomerFragment}
  ${LineItemFragment}
  ${ShippingMethodFragment}

  fragment DefaultCart on Cart {
    id
    customerId
    customerEmail
    lineItems {
      ...DefaultLineItem
    }
    totalPrice {
      centAmount
    }
    shippingAddress {
      ...DefaultAddress
    }
    billingAddress {
      ...DefaultAddress
    }
    customer {
      ...DefaultCustomer
    }
    totalPrice {
      centAmount
    }
    taxedPrice {
      totalNet {
        centAmount
      }
      totalGross {
        centAmount
      }
    }
    paymentInfo {
      payments {
        id
      }
    }
    shippingInfo {
      price {
        centAmount
      }
      shippingMethod {
        ...DefaultShippingMethod
      }
    }
    discountCodes {
      discountCode {
        id
        code
        isActive
        validFrom
        validUntil
        name(acceptLanguage: $acceptLanguage)
      }
    }
    refusedGifts {
      isActive
      validFrom
      validUntil
      name(acceptLanguage: $acceptLanguage)
    }
    custom {
      customFieldsRaw {
        name
        value
      }
    }
    cartState
    version
    inventoryMode
  }
`
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
