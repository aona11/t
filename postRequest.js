const {key ,secret} = require('./config')


var querystring = require('querystring');
var https = require('https')
var crypto = require('crypto');
var _ = require('underscore')
let nonce = + new Date();


function encrypt(key ,str) {
	var hmac = crypto.createHmac('sha512', key);
	var signed = hmac.update(str).digest("hex")
	return signed
}


function postRequest(options) {
	var postData = querystring.stringify(_.extend({'nonce': ++nonce }, options));

	var postOptions = {
		host: 'poloniex.com',
		port: '443',
		path: '/tradingApi',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData),
			'Key': key,
			'Sign': encrypt(secret, postData)
		}
	};

	// Set up the request

	return new Promise((resolve, reject)=>{
		var postReq = https.request(postOptions, function (res) {
			let response = '';
			res.setEncoding('utf8');
			res.on('data', (chunk)=>{
				console.log('Response: ' + chunk);
				response += chunk;
			});

			res.on('end', ()=>{
				resolve(response)
			});
		});

		// post the data
		postReq.write(postData);
		postReq.end();
	});
}


module.exports = postRequest