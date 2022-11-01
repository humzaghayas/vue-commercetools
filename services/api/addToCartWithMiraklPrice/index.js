const { ADD_TO_CART } =require('./defaultQuery');
const gql =require ('graphql-tag');

 
const addToCartWithMiraklPrice = async (context, params, customQuery) => {
 const { locale, acceptLanguage, currency, store } = context.config;

  const userVariables = params ? {
    locale,
    currency,
    ...params
  } : {};

 

  const defaultVariables = {
    ...userVariables,
    acceptLanguage
  };


  const { updateCart: updateCartGql } = context.extendQuery(
    customQuery, { updateCart: { query: ADD_TO_CART, variables: defaultVariables } }
  );

  try {
    return await context.client.mutate({
      mutation: gql`${updateCartGql.query}`,
      variables: updateCartGql.variables,
      fetchPolicy: 'no-cache'
    });
  } catch (error) {
    const canRetry = params.versionFallback ?? true;
    const causedByMismatch = error.graphQLErrors?.[0]?.code?.includes(VERSION_MISMATCH_CODE);
    const currentVersion = error.graphQLErrors?.[0]?.currentVersion;

    if (!causedByMismatch || !canRetry || !currentVersion) {
      throw error;
    }

    Logger.debug('Cart version mismatch. Retrying with current version.');

    return addToCartWithMiraklPrice(context, { ...params, version: currentVersion }, customQuery);
  }

}

module.exports ={addToCartWithMiraklPrice}
