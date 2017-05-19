let postReq = require('./postRequest')
let getReq = require('./getRequest')
var express = require('express');
var child_process = require('child_process')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var url = 'http://127.0.0.1';
var port = 3000
var cmd = '';

app.post('/', (req, res)=>{
	postReq(req.body).then((data)=>{
		res.send(data)
	}).catch(err=>{
		res.send(err)
	})
});


app.get('/public', (req, res)=>{
	getReq(req).then((data)=>{
		res.send(data)
	}).catch(err=>{
		res.send(err)
	})
});


switch (process.platform) {
	case 'wind32':
		cmd = 'start';
		break;

	case 'linux':
		cmd = 'xdg-open';
		break;

	case 'darwin':
		cmd = 'open';
		break;
}
app.listen(3000,()=>{
	console.log('start listen poloniex.com trade api ');

})
child_process.exec(cmd + ' ' + url + ':' + port)