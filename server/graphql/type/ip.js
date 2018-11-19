const graphql = require("graphql");

const s = (value) => {
  if(/[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}:[0-9]{1,4}/i.test(value)){
    return value;
  }else{
    throw new Error("Пример ip 123.123.123.123");
  }
};

const pL = (ast) => {
  if(/[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}:[0-9]{1,4}/i.test(ast.value)){
    return ast.value;
  }else{
    throw new Error("Пример ip 123.123.123.123");
  }
};

const mail = new graphql.GraphQLScalarType({
  name: "ip",
  serialize: s,
  parseValue: s,
  parseLiteral: pL
});

module.exports = mail;