const graphql = require("graphql");
const config = require("../../conf.server.js");
const ddns = require("../schemes/ddns.js");

module.exports = {
  type: ddns,
  args: {
    token: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    domen: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    ip: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
  },
  resolve (source, args, context) {
    return new Promise((resolve, reject) => {
      if(args.token != config.token) throw "Не верный токен";
      if(!/^[a-z0-9]+$/i.test(args.domen)) throw "Только символы a-z0-9";
      if(!/[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}:[0-9]{1,4}/i.test(args.ip)) throw "Пример IP 123.123.123.123:3000";

      let n = context.db.find(element => {return element.domen == args.domen;});
      if(n == undefined){
        throw "Домен не существует";        
      }else{
        n.ip = args.ip;
        resolve({code: 1});
      }
    }).catch(err => {
      return {code: err}; 
    });
  }
};