import { apiClientFactory } from '@vue-storefront/core';

function onCreate(configuration) {

    const {baseURL} = configuration;
  return {
    config: {...configuration},
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