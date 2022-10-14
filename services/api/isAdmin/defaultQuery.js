const {gql }= require('graphql-tag');

module.exports.query= gql`
query($where:String){
  customers(where:$where){
    results{
      custom{
        customFieldsRaw{
          name
          value
        }
    	}
      customerGroup{
        id
        key
      }
    }
  }
}
`;
