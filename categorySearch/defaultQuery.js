const {gql }= require('graphql-tag');

module.exports.query= gql`
query($where:String,$locale:Locale){
  categories(where:$where){
    
    results{
    	slug(locale:$locale)
      name(locale:$locale)
      description(locale:$locale)
      childCount
      stagedProductCount
      parent {
        ...DefaultCategorySearch
        parent {
          ...DefaultCategorySearch
          parent {
            ...DefaultCategorySearch
          }
        }
      }
      children {
        ...DefaultCategorySearch
      }
    }
  }
}

fragment DefaultCategorySearch on Category {
  id
  slug(locale:$locale)
  name(locale:$locale)
  childCount
  stagedProductCount
  children {
    ...CategorySearchChildren
    children {
      ...CategorySearchChildren
      children {
        ...CategorySearchChildren
      }
    }
  }
}

fragment CategorySearchChildren on Category {
  id
  slug(locale:$locale)
  name(locale:$locale)
  childCount
  stagedProductCount
}
`;
