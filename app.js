var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var _ = require('lodash');
const camelCase = require('camelcase');
var asyncFetchData = require('./async');
var sendDocsToDiscovery = require('./watson-discovery');

// Check data folder to see if files are already there
// If not, run axios call to get/write them

fs.readdir('./data', function(err, files) {
	if (err) {
		console.error(err);
	} else {
		if (!files.length) {
			asyncFetchData().then(res => {
				let products = res.products;
				// Iterate through the json data's products array
				_.forEach(products, function(product, index){ 
					// Make each product object in product array into a separate json file with product name 
					// as the file name - using fs function
					let fileName = camelCase(product.name);
					try {
					   // fs.writeFileSync('data/' + fileName + '.json', JSON.stringify(product));
					   console.log(fileName);
					} catch (err) {
						console.log("Cannot write file ", err)
					}
					//console.log(JSON.stringify(product.name));
				});
			});
		} else {
			// add existing files to Discovery
			sendDocsToDiscovery('./data', files);
		}
	}
})


app.get('/', async (req, res) => {
	res.send('Hello World!');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});