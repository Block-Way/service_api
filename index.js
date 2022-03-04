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

// 最后版本信息
app.get('/lastVersion', function(req, res, next) {
  res.send([{"date":"2022-01-01","version":"V1.1","url":"app-debug.apk","type":"android"}]);
});

// 报价信息
app.get('/quotations', function(req, res, next) {
  console.log("quotations");
  res.send([
    {
      "tradePairId": "btca/usdt",
      "precision": 8,
      "price": 2728.13,
      "price24h": 34670.32
    },
    {
      "tradePairId": "bbc/usdt",
      "precision": 8,
      "price": 12728.13,
      "price24h": 34670.32
    },
    {
      "tradePairId": "btc/usdt",
      "precision": 8,
      "price": 12728.13,
      "price24h": 34670.32
    },
    {
      "tradePairId": "eth/usdt",
      "precision": 8,
      "price": 7728.13,
      "price24h": 34670.32
    },
    {
      "tradePairId": "bnb/usdt",
      "precision": 8,
      "price": 7728.13,
      "price24h": 34670.32
    }
  ]);
});

// 轮播图
app.get('/banners', function(req, res, next) {
  console.log("banners");
  //'id': 1,
  //'type': 'type1',
  //'title': 'title1',
  //'content': 'content1',
  //'img': '350x150.png',
  //'bg_img': '350x150.png'
  res.send([{"id":1,"type": "type1","title": "title1","content": "content1","img":"350x150.png","bg_img": "350x150.png"}]);
});

let server = app.listen(80, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('http://%s:%s', host, port);
})