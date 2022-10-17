const {gql }= require('graphql-tag');
const {query} = require( './defaultQuery');

const getCartsStatuses = async (context, params) => {

    const{cartIds} = params;

    const temp = cartIds.map((id,index) =>{
      return `"${id}"`;
    });

    const cartIdsForWhere = temp.join(",");
  
    const defaultVariables = {
      where:`id in ( ${cartIdsForWhere})`
    }   

    const { customerQuery } =  { customerQuery: { query: query, variables: defaultVariables } };
    const request = await (context.client ).query({
      query: gql`${customerQuery.query}`,
      variables: customerQuery.variables,
      fetchPolicy: 'no-cache'
    });

    if(request.data.carts.results){
      let results = {};
      for (var i=0 ; i<request.data.carts.results.length ; i++){
        const res = request.data.carts.results[i];
        results[res.id] = res.cartState
      }

      return {"results":results}
    }
    
    return {"results":null};
}

module.exports ={getCartsStatuses};