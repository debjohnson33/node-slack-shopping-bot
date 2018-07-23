var express = require('express');
var app = express();
//var async = require('./async')

//async.

app.get('/', async (req, res) => {
	res.send('Hello World!');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});