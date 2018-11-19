const graphql = require("graphql");
const ddns = require("./ddns.js");
const ddnsIp = require("./ddnsIp.js");

const Mutations = new graphql.GraphQLObjectType({
  name: "Mutations",
  description: "Functions to set stuff",
  fields () {
    return {
      ddns: ddns,
      ddnsIp: ddnsIp
    };
  }
});

module.exports = Mutations;
