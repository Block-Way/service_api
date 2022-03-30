const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const request = require('request')
const lib = require('./lib.js')
const browser = require('./browser.js')
const app = express();

const url = 'http://127.0.0.1:8812';
const conn = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'hah',
  password: '1234qwer',
  database: 'hah'
});


app.use(express.static(__dirname + '/static', {index: 'help.html'}));
app.use(bodyParser.json());

browser.Load(app,conn);

app.get('/transctions/:addr', function(req, res, next) {
  console.log("transctions.",req.params.addr);
  let sql = `select t.txid, t.block_hash, t.form as \`from\`, t.\`to\`, format(t.amount,4) as amount,
  format(t.free,4) as fee,
  (case when t.form =? and left(t.\`to\`,4)<>'20w0' then 2  
        when t.\`to\` =? and left(t.form,4)<>'20w0' then 4 end) as flag,
b.height,FROM_UNIXTIME(b.time,'%m-%d %H:%i:%s') as time
from Tx t join Block b on b.\`hash\` = t.block_hash
where (\`to\`=? or form=?) order by t.id desc limit 10`
  let params = [req.params.addr,req.params.addr,req.params.addr,req.params.addr];
  conn.query(sql,params,function(err,result){
    if(err){
      res.json({'error':err});
      return;
    }
    let dataString =JSON.stringify(result);
    res.send(JSON.parse(dataString));
  });
});

app.post('/createtransaction', function(req, res, next) {
  let ts = req.body.time;
  let fork = req.body.fork;
  if (fork == undefined) {
    fork = g_frok;
  }
  let nonce = req.body.nonce;
  let from = req.body.from;
  let to = req.body.to;
  let amount = req.body.amount;
  let gasPrice = req.body.gasprice;
  if (gasPrice == undefined) {
    gasPrice = "0.0000010000";
  }
  let gasLimit = req.body.gaslimit;
  if (gasLimit == undefined) {
    gasLimit = 10000;
  }
  let data = req.body.data;
  if (data == undefined) {
    data = '00';
  }
  let ret = lib.GetTx(ts,fork,nonce,from,to,amount,gasPrice,gasLimit,data);
  res.json(ret);
});

app.post('/GetVote', function(req, res, next) {
  let delegate = req.body.delegate;
  let owner = req.body.owner;
  let rewardmode = req.body.rewardmode;
  let ret = lib.GetVote(delegate,owner,rewardmode);
  res.json(ret);
});

let server = app.listen(7711, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('http://%s:%s', host, port);
});
