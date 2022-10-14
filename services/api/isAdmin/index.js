const {gql }= require('graphql-tag');
const {query} = require( './defaultQuery');

const isAdmin = async (context, params, customQuery) => {

    const{email} = params;
  
    const defaultVariables = {
      "where":"email=\""+email+"\""
    }   
    const { customerQuery } =  { customerQuery: { query: query, variables: defaultVariables } };
    const request = await (context.client ).query({
      query: gql`${customerQuery.query}`,
      variables: customerQuery.variables,
      fetchPolicy: 'no-cache'
    });

    let value=false;
    let cGroupKey ='';
    let cGroupId ='';

    if(request.data.customers.results != null && request.data.customers.results.length > 0){
      let customer = request.data.customers.results[0];
        if(customer.custom){
            var cFields = request.data.customers.results[0].custom.customFieldsRaw.find(cf =>(cf.name === 'roles'));
            if( cFields ){//  c.name === 'roles'){
                value = cFields.value.includes("b2b-company-admin");
            }
        }

        if(customer.customerGroup && customer.customerGroup.key){
          cGroupKey = customer.customerGroup.key;
          cGroupId= customer.customerGroup.id;
        }
    }

    return {"isAdmin":value,"companyId":cGroupKey,"customerGroupId":cGroupId};
}

module.exports ={isAdmin};