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

    if(request.data.customers.results != null && request.data.customers.results.length > 0){
        if(request.data.customers.results[0].custom){
            var cFields = request.data.customers.results[0].custom.customFieldsRaw.find(cf =>(cf.name === 'roles'));
            if( cFields ){//  c.name === 'roles'){
                value = cFields.value.includes("b2b-company-admin");
            }
        }
    }

    let cGroupKey ='';
    if(request.data.customerGroup && request.data.customerGroup.key){
      cGroupKey = request.data.customerGroup.key;
    }
  
    return {"isAdmin":value,"companyId":cGroupKey};
}

module.exports ={isAdmin};