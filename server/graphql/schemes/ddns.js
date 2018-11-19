const graphql = require("graphql");

const ddns = new graphql.GraphQLObjectType({
  name: "ddns",
  description: "ddns",
  fields: () => {
    return {
      token: { 
        type: graphql.GraphQLString,
        resolve (res) {
          return res.token;
        } 
      },
      domen: { 
        type: graphql.GraphQLString,
        resolve (res) {
          return res.domen;
        } 
      },
      code: {
        type: graphql.GraphQLString,
        resolve (res) {
          return res.code;
        } 
      },
      ip: {
        type: graphql.GraphQLString,
        resolve (res) {
          return res.ip;
        } 
      }
    };
  }
});

module.exports = ddns;