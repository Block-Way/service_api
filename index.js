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

let server = app.listen(7711, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('http://%s:%s', host, port);
});
