const {gql }= require('graphql-tag');
const {query} = require( './defaultQuery');

const getProductPricesByIds = async (context, params, customQuery) => {

    const{ids} = params;

    const { locale, acceptLanguage, currency } = context.config;

    if(!locale){
      locale = "en";
    }

    const paramsIds = ids.map(id => `\"${id}\"`).join(',');
  
    const defaultVariables = {
      locale,
      acceptLanguage,
      currency,
      "where":"id in ("+paramsIds+")"
    }   
    const { customerQuery } =  { customerQuery: { query: query, variables: defaultVariables } };
    const request = await (context.client ).query({
      query: gql`${customerQuery.query}`,
      variables: customerQuery.variables,
      fetchPolicy: 'no-cache'
    });

    if(request.data.products != null && request.data.products.results && request.data.products.results.length > 0){
      const products = request.data.products.results;
      
      const pricesChannel =products.map(p => {
          const mVariant = p.masterData.current.masterVariant;
          const pId = p.id;
          let productPrices ={productId:pId,parentSku:mVariant.sku};

          const variants = p.masterData.current.variants;
          if(variants){
            productPrices.variants = variants.map(variant => {
              return getVariantPrices(variant)
            }).filter(vp => vp != null);
          }

          return productPrices;
        });


      return {"prices":pricesChannel};
    }

    return {"prices":null};
}

const getVariantPrices =(variant) =>{
 // const variant = p.masterData.current.masterVariant;
 
  if(variant.prices){
    
    const varSku =variant.sku;
    let variantObj = {};
    
    const price =variant.prices[0];
    if(price.value ){

      variantObj = {
        varSku,
        amount:price.value.centAmount/100,
        currencyCode:price.value.currencyCode
      }
    variant.attributesRaw.
            filter(a => (a.name === 'shop_name' ||
                      a.name === 'shop_id' ||
                      a.name === 'sku'
                  )).forEach(attr => {
                    variantObj[attr.name]=attr.value;
                });
      return variantObj;
    }
  }

  return null;  
}

module.exports ={getProductPricesByIds};