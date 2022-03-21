const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const request = require('request');
const app = express();

const url = 'http://127.0.0.1:8604';

const conn = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'hah',
  password: '1234qwer',
  database: 'hah'
});

conn.connect();

app.use(express.static(__dirname + '/static', {index: 'help.html'}));
app.use(bodyParser.json());

const frok = '00000000a137256624bda82aec19645b1dd8d41311ceac9b5c3e49d2822cd49f';

function query(sql,params) {
  return new Promise(fun => {
    conn.query(sql,params,function(err,result) {
      if (err) {
        return;
      }
      fun(result);
    });
  });
};

function hah_method(method,params) {
  return new Promise(fun => {
    request({
        url: url,
        method: 'POST',
        json: true,
        body:{'id':1,'method' : method,'jsonrpc':'2.0','params' : params}},
      function(error, response, body) {
        if (body.error) {
          return;
        } else {
          fun(body.result);
        }
      });
  });  
}

// http://127.0.0.1:7711/quotations
app.get('/quotations', async function(req, res, next) {
  console.log('quotations');
  let sql = 'SELECT tradePairId,price,`precision`,price24h FROM quotations';
  let ret = await query(sql,[req.query.walletId]);
  let dataString = JSON.stringify(ret);
  res.send(JSON.parse(dataString));
});

app.post('/register', function(req, res, next) {
  let bbc_addr = '';
  let eth_addr = '';
  let btc_addr = '';
  for (let n = 0; n < req.body.params.wallet.length; n++) {
    switch (req.body.params.wallet[n].chain) {
      case 'BTC':
        btc_addr = req.body.params.wallet[n].address;
        break;
      case 'ETH':
        eth_addr = req.body.params.wallet[n].address;
        break;
      case 'BBC':
        bbc_addr = req.body.params.wallet[n].address;
        break;
    }
  }
  let walletId = req.body.params.hash;
  let sql = 'select * from addr where walletId = ?';
  btca_conn.query(sql,[walletId],function(err,result){
    if (err) {
      console.log('register','err');
      res.json({'error':err});
      return;
    }
    if (result.length == 0) {
      let pub = utils.Addr2Hex(bbc_addr);
      pub = pub.subarray(1);
      pub.reverse();
      request({
        url: url,
        method: 'POST',
        json: true,
        body:{'id':2,'method':'importpubkey','jsonrpc':'2.0','params':{'pubkey': pub.toString('hex')}}
      },function(error, response, body) {
        sql = 'insert into addr(walletId,bbc_addr,eth_addr,btc_addr)values(?,?,?,?)';
        btca_conn.query(sql,[walletId,bbc_addr,eth_addr,btc_addr],function(err,result) {
          console.log('register','Add');
          res.json({'status':'add'});
        });
      });
    } else {
      console.log('register','OK');
      res.json({'status':'OK'});
    }
  });
});


app.get('/banners', async function(req, res, next) {
  console.log('banners');
  let sql = 'SELECT * FROM banners';
  let ret = await query(sql,[req.query.walletId]);
  let dataString = JSON.stringify(ret);
  res.send(JSON.parse(dataString));
});

let server = app.listen(7711, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('http://%s:%s', host, port);
});