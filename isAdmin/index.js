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


    if(request.data.customers.results != null && request.data.customers.results.length > 0){
        if(request.data.customers.results[0].custom.customFieldsRaw){

            for(var i=0 ; i< request.data.customers.results[0].custom.customFieldsRaw.length; i++){
                var c = request.data.customers.results[0].custom.customFieldsRaw[i];

                if(c.name === 'isAdmin'){
                    return {"isAdmin":c.value};
                }
            }
        }
    }
  
    return {"isAdmin":false};
}

module.exports ={isAdmin};