const graphql = require("graphql");

const Query = new graphql.GraphQLObjectType({
  name: "Query",
  description: "Root query object",
  fields: () => {
    return {};
  }
});

module.exports = Query;