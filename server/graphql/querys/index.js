const graphql = require("graphql");
const getIp = require("./getIp.js");

const Query = new graphql.GraphQLObjectType({
  name: "Query",
  description: "Root query object",
  fields: () => {
    return {
      getIp: getIp
    };
  }
});

module.exports = Query;