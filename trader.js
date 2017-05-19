// We need this to build our post string
var querystring = require('querystring');
var https = require('https');
var fs = require('fs');

var key = 'EN2M4ABW-KSLG3TBY-I5EB4F57-VW8JF3KJ'
var secret = "e94b35d59527ddad4b281d55fee013ec7161e97d3a1f4ec84720a7419a596eee4f1729d48c73243156fe0b288e2cc69c363beca769041905a7919b63871aad5d";



var crypto = require('crypto');
var hmac = crypto.createHmac('sha256', key);


var nonce = 2;

function encrypt(key ,str) {
	console.log('key',key,str)
	var hmac = crypto.createHmac('sha512', key);
	var signed = hmac.update(str).digest("hex")
	console.log('signed',signed)
	return signed
}



function PostCode(type, options) {
	// Build the post string from an object
	var post_data = querystring.stringify({
		'nonce': nonce,
		'command': type
	});

	// An object of options to indicate where to post to
	var post_options = {
		host: 'poloniex.com',
		port: '443',
		path: '/tradingApi',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(post_data),
			'Key': 'EN2M4ABW-KSLG3TBY-I5EB4F57-VW8JF3KJ',
			'Sign': encrypt(secret, post_data)
		}
	};

	// Set up the request
	var post_req = https.request(post_options, function (res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
		});
	});

	// post the data
	post_req.write(post_data);
	post_req.end();
}


PostCode('returnBalances');
nonce ++;