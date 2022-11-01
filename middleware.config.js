const {categorySearch} =require( './services/api/categorySearch');
const {isAdmin} =require( './services/api/isAdmin');
const {getMe} =require( './services/api/getMe');
const {saveShippingAddressQuote} =require( './services/api/saveShippingAddressQuote');
const {getCartsStatuses} =require( './services/api/getCartsStatuses');
const {customQueries} =require( './custom-queries');
const {getProductPricesByIds}=require( './services/api/getProductPricesByIds');
const {createMyShippingAddress}=require( './services/api/createMyShippingAddress');
const {addToCartWithMiraklPrice} = require('./services/api/addToCartWithMiraklPrice');

module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'customExtensions',
          extendApiMethods: {
            async categorySearch(context, params) { return categorySearch(context,params); },
            async isAdmin(context, params) { return isAdmin(context,params); },
            async getMe(context, params) { return getMe(context,params); },
            async saveShippingAddressQuote(context, params) { return saveShippingAddressQuote(context,params); },
            async getCartsStatuses(context, params) { return getCartsStatuses(context,params); },
            async getProductPricesByIds(context, params) { return getProductPricesByIds(context,params); },
            async createMyShippingAddress(context, params) { return createMyShippingAddress(context,params); },
            async addToCartWithMiraklPrice(context, params) { return addToCartWithMiraklPrice(context,params); },          
          }
        }
      ],
      customQueries,
      configuration: {
        api: {
          uri: 'https://api.us-central1.gcp.commercetools.com/drl-dev/graphql',
          authHost: 'https://auth.us-central1.gcp.commercetools.com',
          projectKey: 'drl-dev',
          clientId: 'U4twMKLxeK5JVNVbExdWssm5',
          clientSecret: '0ib_LmWPIMYwL7hVEbEMAOOIwNMGT0Id',
          scopes: [
            'manage_project:drl-dev'
          ]
        },
        serverApi: {
          clientId: 'U4twMKLxeK5JVNVbExdWssm5',
          clientSecret: '0ib_LmWPIMYwL7hVEbEMAOOIwNMGT0Id',
          scopes: [
            'manage_project:drl-dev'
          ]
        },
        currency: 'USD',
        country: 'US',
        languageMap: {
          en: ['en', 'de','en-US'],
          de: ['de', 'en','en-US']
        }
      }
    }
  }
};
