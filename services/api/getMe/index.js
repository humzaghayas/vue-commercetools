const { basicProfile, fullProfile,CREATE_MY_CART_MUTATION } =require('./defaultQuery');
const gql =require ('graphql-tag');

 
const getMe = async (context, params, customQuery) => {
  const { locale, acceptLanguage, currency } = context.config;
  const { customer }= params;

  const defaultVariables = {
    locale,
    acceptLanguage,
    currency
  };

  const { getBasicProfile, getFullProfile } = context.extendQuery(customQuery, {
    getBasicProfile: { query: basicProfile, variables: defaultVariables },
    getFullProfile: { query: fullProfile, variables: defaultVariables }
  });

  const profile = customer ? getFullProfile : getBasicProfile;

  const request = await (context.client ).query({
    query: gql`${profile.query}`,
    variables: profile.variables,
    fetchPolicy: 'no-cache'
  });

  if(request.data.me && request.data.me.activeCart && request.data.me.activeCart.custom){
    let quoteField = request.data.me.activeCart.custom.customFieldsRaw.find(cf =>(cf.name === 'isQuote' && cf.value  ));

    if(quoteField){
      request.data.me.activeCart = null;
      // const country = request.data.me.activeCart.country;
      // let mutateVar = {draft:{country:"US",currency},locale,acceptLanguage,currency};

      // const requestCart = await (context.client ).mutate({
      //   mutation: CREATE_MY_CART_MUTATION,
      //   variables: mutateVar
      // });
      // return requestCart;
    }
  }

  return request;
}

module.exports ={getMe}
