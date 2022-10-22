const {gql }= require('graphql-tag');

module.exports.query= gql`
query($where:String){
  products(where:$where){
    count
    total
    offset
    results{
      id
      masterData{
        current{
          
          masterVariant{
            sku
            prices{
              value{
                currencyCode
                centAmount
              }
            }
          }
          variants{
            sku
            prices{
              value{
                currencyCode
                centAmount
              }
            }
            attributesRaw{
              name
              value
            }
          }
        }
      }
    }
  }
}
`;
