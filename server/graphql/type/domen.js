const graphql = require("graphql");

const s = (value) => {
  if(/^[a-z0-9]+$/i.test(value)){
    return value;
  }else{
    throw new Error("Только символы a-z0-9");
  }
};

const pL = (ast) => {
  if(/^[a-z0-9]+$/i.test(ast.value)){
    return ast.value;
  }else{
    throw new Error("Только символы a-z0-9");
  }
};

const mail = new graphql.GraphQLScalarType({
  name: "domen",
  serialize: s,
  parseValue: s,
  parseLiteral: pL
});

module.exports = mail;