// (function () {

	'use strict';

	var stocks = [
		{"name":"DJIA", "country": "US", "value": 16412.71, "status":"down"}
	];

	var counter = 0;

	var StockWatch = module.exports = function () {

		console.log('stock watch init...');

	};

	StockWatch.prototype.generateStocks = function () {

		counter += 1;

		if (counter === 1) {

			return stocks;

		} else {

			for (var i = 0; i < stocks.length; i += 1) {
				var val = Math.random() * 80.24;
				var plusMinus = Math.random() < 0.5 ? -1 : 1;
				stocks[i]['value'] += val * plusMinus;
				if (plusMinus === -1) {
					stocks[i]['status'] = 'down';
				} else {
					stocks[i]['status'] = 'up';
				}
			}

			console.log(stocks);

			return stocks;

		}

	};

// }());