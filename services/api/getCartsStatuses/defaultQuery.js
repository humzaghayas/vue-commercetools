const {gql }= require('graphql-tag');

module.exports.query= gql`
query($where:String){
  carts(where:$where){
   offset
   count
   results{
     id
     cartState
   }
  }
 }
`;
