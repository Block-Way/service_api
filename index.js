const express = require('express');
const bodyParser = require('body-parser')
//const mysql = require('mysql');
//const request = require('request')
//const lib = require('./lib.js')
//const moment = require('moment');

const app = express();
app.use(express.static(__dirname + '/static', {index: 'help.html'}));
app.use(bodyParser.json());


app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
});

app.get('/test', function(req, res, next) {
    res.send({"abc":"abc"});
});

let server = app.listen(1234, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('http://%s:%s', host, port);
})