const {gql }= require('graphql-tag');
const {query} = require( './defaultQuery');

const getUpdatedQuotes = async (context, params, customQuery) => {

    // const{limit,offset,quoteState} = params;
  
    // const defaultVariables = {limit,offset,quoteState} ;

    // const { customerQuery } =  { customerQuery: { query: query, variables: defaultVariables } };
    // const client = context.app.apolloProvider.defaultClient;
    // const request = await (client ).query({
    //   query: gql`${customerQuery.query}`,
    //   variables: customerQuery.variables,
    //   fetchPolicy: 'no-cache'
    // });
     
    
    return {test:JSON.stringify(context)};
}

module.exports ={getUpdatedQuotes};