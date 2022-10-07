const {gql }= require('graphql-tag');
const {query} = require( './defaultQuery');
// import { CategorySearchResult } from '../../types/GraphQL';
// import { buildCategoryFilter } from '../../helpers/search';


const categorySearch = async (context, params, customQuery) => {
  const { acceptLanguage } = context.config;
  const defaultVariables = params ? {
    limit: params.limit,
    offset: params.offset,
    locale:"en" ,
    id:"34b7e583-1827-4b24-ba59-a76ee947ad56"
  } : { id:"34b7e583-1827-4b24-ba59-a76ee947ad56",locale:"en" }; 

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
