const express = require("express");
const graphqlHTTP = require("express-graphql");
const fs = require("fs");

const httpProxy = require('http-proxy');
const schema = require("./graphql/graphql.js");

let proxy = httpProxy.createProxyServer();
let app = express();

let db = JSON.parse(fs.readFileSync("./server/domenIP.json", "utf8"));

setInterval(function() {
  let jDB = JSON.stringify(db);
  if(JSON.parse(fs.readFileSync("./server/domenIP.json", "utf8")) != jDB){
    fs.writeFileSync("./server/domenIP.json", JSON.stringify(db));
  }
}, 2000);

app.use("/api", (req, res) => {
  return graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: { req, res, db }
  })(req, res);
});

const info = `
mutation{ddns(token: "qw345ookfoINOUHO9jf9j93", domen: "qwe1.zhna.ru"){code}} <br>
mutation{ddnsip(token: "qw345ookfoINOUHO9jf9j93", domen: "qwe1.zhna.ru", ip: "123.123.123.123:830"){code}} <br>
`
app.get('/info', function (req, res) {
  res.send(info);
})

app.use('/', function (req, res, next){ //'http://176.125.195.113:3001' +".zhna.ru"
  let n = db.find(element => {return element.domen+".zhna.ru" == req.headers.host;})
  console.log(n, req.headers.host)
  if(n != undefined){
    proxy.web(req, res, { target: "http://"+n.ip }, function(error) {
      res.send(error);
    });
  }else{
    res.send("Домена не сущствует");
  }
});

var server = app.listen(3000, function () { //"10.100.16.175",
  console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
});

//Api
/*
mutation{ddns(token: "qw345ookfoINOUHO9jf9j93", domen: "qwe1"){code}}
mutation{ddnsIp(token: "qw345ookfoINOUHO9jf9j93", domen: "qwe1", ip: "123.123.123.123:830"){code}}
mutation{ddnsDell(token: "qw345ookfoINOUHO9jf9j93", domen: "qwe1"){code}}
*/