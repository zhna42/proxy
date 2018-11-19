const graphql = require("graphql");
const fs = require("fs");
const config = require("../../conf.server.js");
const ddns = require("../schemes/ddns.js");

module.exports = {
  type: ddns,
  args: {
    token: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    domen: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
  },
  resolve (source, args, context) {
    return new Promise((resolve) => {
      if(args.token != config.token) throw "Не верный токен";
      if(!/^[a-z0-9]+$/i.test(args.domen)) throw "Только символы a-z0-9";
      if(context.db.find(element => {return element.domen == args.domen;}) == undefined){
        context.db.push({domen: args.domen, ip: ""});
        resolve({code: 1});
      }else{
        throw "Домен существует";
      }   
    }).catch(err1 => {
      return {code: err1}; 
    });
  }
};