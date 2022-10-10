const {gql }= require('graphql-tag');
const {query} = require( './defaultQuery');
// import { CategorySearchResult } from '../../types/GraphQL';
// import { buildCategoryFilter } from '../../helpers/search';


const categorySearch = async (context, params, customQuery) => {
  const { acceptLanguage } = context.config;

  const{slug} = params;

  const defaultVariables = params ? {
    limit: params.limit,
    offset: params.offset,
    locale:"en" ,
    "where":"id=\""+slug+"\""
  } : { 
    "where":"id=\""+slug+"\"",locale:"en",
    limit: 10,
    offset: 0
   }; 

  const { categorySearch } = context.extendQuery(customQuery,
    { categorySearch: { query: query, variables: defaultVariables } }
  );
  const request = await (context.client ).query({
    query: gql`${categorySearch.query}`,
    variables: categorySearch.variables,
    fetchPolicy: 'no-cache'
  });

  const v ={data:{
    categorySearch:request.data.categories}
  }
  return v;
};

module.exports= {categorySearch};
