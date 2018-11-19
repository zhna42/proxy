/* eslint-disable no-unused-vars */
const graphql = require("graphql");
const ddns = require("../schemes/ddns.js");
const config = require("../../conf.server.js");

module.exports = {
  type: ddns,
  args: {
    token: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
  },
  resolve (source, args, context) {
    if(args.token != config.token) throw "Не верный токен";
    console.log(req.headers);
    return {
      code: "sorry dev"
    };
  }
};
