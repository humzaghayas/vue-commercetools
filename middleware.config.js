
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
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
          en: ['en', 'de'],
          de: ['de', 'en']
        }
      }
    }
  }
};
