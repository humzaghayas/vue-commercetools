const {  UPDATE_CUSTOMER_MUTATION } =require('./defaultQuery');
const gql =require ('graphql-tag');
const{getMe} = require('../getMe');
 
const createMyShippingAddress = async (context, params, customQuery) => {
  const { locale, acceptLanguage, currency } = context.config;

  let shippingDetails = null;
  if(params){
    shippingDetails = params.shippingDetails;
  }

  const defaultVariables = {
    locale,
    acceptLanguage,
    currency
  };


  const {data} =await getMe(context,{customer:true});

  const version = data.me.customer.version;

  // return{version};

  if(version){
   
    const key = (shippingDetails.firstName+shippingDetails.lastName
            +shippingDetails.streetName+shippingDetails.streetNumber)
            .replace(" ","_");
    let actions =[
      {"addAddress":{"address":
        {"key":key,
        "firstName":shippingDetails.firstName,
        "lastName":shippingDetails.lastName,
        "streetName":shippingDetails.streetName,
        "streetNumber":shippingDetails.streetNumber,
        "postalCode":shippingDetails.postalCode,
        "city":shippingDetails.city,
        "state":shippingDetails.state,
        "country":shippingDetails.country,
        "phone":shippingDetails.phone}
      }}
    ];

    let request= await updateAction(context,{version,actions});

    actions=[
      {"addShippingAddressId":{
        "addressKey":key
      }}]

    request= await updateAction(context ,{version:request.data.updateMyCustomer.version,actions});
    return request;
  }

  return null;
}

const updateAction =async (context,{version,actions}) =>{
  const request = await (context.client ).mutate({
      mutation: UPDATE_CUSTOMER_MUTATION,
      variables: {version,
        actions}
    });

    return request;
}

module.exports ={createMyShippingAddress,updateAction}
