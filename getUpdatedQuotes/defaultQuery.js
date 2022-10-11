const {gql }= require('graphql-tag');

module.exports.query= gql`
query GET_SUBMITTED_QUOTES ($limit:Int,$offset:Int,$quoteState:[String!]){
  quotes (limit:$limit,offset:$offset,quoteState:$quoteState){
      count
      total
      results{
      id
      version
      employeeEmail
      quoteState
      quoteNumber
      percentageDiscount
      totalPrice{
          centAmount,
          currencyCode
      }
      company{
          id,
          name
      }
      lineItems{
        quantity
        price{
          value{
            currencyCode
            centAmount
          }
        }
        originalPrice{
          centAmount
          currencyCode
        }
        totalPrice{
          centAmount
          currencyCode
        }
        nameAllLocales{
          locale
          value
        }
        variant{
          sku
          price{
            value{
              centAmount
              currencyCode
            }
          }
        }
      }
      }
  }
  }
`;
