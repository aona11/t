var https = require('https')

function request(param) {
	console.log('param',param)
	var options = {
		host: 'poloniex.com',
		port: '443',
		path: param.url,
		method: 'GET',
	};

	console.log('options',options)
	// Set up the request

	return new Promise((resolve, reject)=>{
		var req = https.request(options, function (res) {
			let response = '';
			res.setEncoding('utf8');
			res.on('data', (chunk)=>{
				console.log('Response: ' + chunk);
				response += chunk;
			});

			res.on('end', ()=>{
				resolve(JSON.stringify({
					status : 0,
					data : JSON.parse(response)
				}))
			});
		});
		req.end();
	});
}


module.exports = request