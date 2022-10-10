
const customQueries = {
  'categories-query': ({ variables }) => ({
    query: `
    { categories(where:"parent is not defined",sort:"orderHint asc") {results {id  key externalId name(locale:"en") description(locale:"en") slug(locale:"en") orderHint custom{ customFieldsRaw { name value } } parent{id,key} children { id key  name(locale:"en") description(locale:"en") slug(locale:"en") orderHint  custom{ customFieldsRaw { name value } } parent{id,key} children { id key externalId name(locale:"en") description(locale:"en") slug(locale:"en") orderHint parent{id,key} children { id key externalId name(locale:"en") description(locale:"en") slug(locale:"en") orderHint parent{id,key} } } } } } }
    `
      })
  }
  
module.exports = {customQueries};