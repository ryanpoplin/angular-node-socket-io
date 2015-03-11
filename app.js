// (function () {
	'use strict';
	var http = require('http'),
		path = require('path'),
		fs = require('fs'),
		StockWatch = require('./stock.watch'),
		stockWatch = new StockWatch();
	var port = process.env.PORT || 9023;
	var srv = http.createServer(function (req, res) {
		var filePath = '.' + req.url;
		if (filePath === './') {
			filePath = './index.html';
		}
		var extname = path.extname(filePath);
		var contentType = 'text/html';
		switch (extname) {
			case '.js':
				contentType = 'text/javascript';
				break;
			case '.css':
				contentType = 'text/css';
				break;
		}
		fs.exists(filePath, function (exists) {
			if (exists) {
				fs.readFile(filePath, function (error, content) {
					if (error) {
						res.writeHead(500);
						res.end();
					} else {
						res.writeHead(200, {
							'Content-Type': contentType
						});
						res.end(content, 'utf-8');
					}
				});
			} else {
				res.writeHead(404);
				res.end();
			}
		});
	});
	var gw_srv = require('socket.io').listen(srv);
	srv.listen(port);
	console.log('Server running at http://127.0.0.1:' + port + '/');
	gw_srv.sockets.on('connection', function (socket) {
		var dataPusher = setInterval(function () {
			var data = stockWatch.generateStocks();
			socket.volatile.emit('stocks', {data:data});
		}, 1000);
		socket.on('disconnect', function () {
			console.log('closing...');
			// ???
			// gw_srv.close();
		});
	});
// }());