const graphql = require("graphql");

const Mutation = require("./mutations/index.js");
const Query = require("./querys/index.js");

var schema = new graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = schema;