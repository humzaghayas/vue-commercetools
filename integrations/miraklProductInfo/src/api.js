const { apiClientFactory } =require ('@vue-storefront/core');
const {} = require('http')

function onCreate(configuration) {
    const {baseURL} = configuration; 
  return {
    config: {
        ...configuration
    },
    client: {}
  };
}

const { createApiClient } = apiClientFactory({
  onCreate,
  api: {

  }
});

export {
  createApiClient
};