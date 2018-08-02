var express = require('express');
var app = express();
require('dotenv').config();
var Botkit = require('botkit');
var bodyParser = require('body-parser');
var fs = require('fs');
var _ = require('lodash');
const camelCase = require('camelcase');
var asyncFetchData = require('./async');
var sendDocsToDiscovery = require('./watson-discovery');
var sendToAssistant = require('./watson-assistant');
var workspace_id = process.env.WORKSPACE_ID;

// Check data folder to see if files are already there
// If not, run axios call to get/write them

// fs.readdir('./data', function(err, files) {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		if (!files.length) {
// 			asyncFetchData().then(res => {
// 				let products = res.products;
// 				// Iterate through the json data's products array
// 				_.forEach(products, function(product, index){ 
// 					// Make each product object in product array into a separate json file with product name 
// 					// as the file name - using fs function
// 					let fileName = camelCase(product.name);
// 					try {
// 					   fs.writeFileSync('data/' + fileName + '.json', JSON.stringify(product));
// 					   console.log(fileName);
// 					} catch (err) {
// 						console.log("Cannot write file ", err)
// 					}
// 					//console.log(JSON.stringify(product.name));
// 				});
// 			});
// 		} 
// 			// Once files exist add existing files to Discovery
// 			//sendDocsToDiscovery('./data', files); <-- uncomment to add files to Discovery
// 	}
// })

// Code to retrieve user input goes here... integration with Slack? or Twilio?
var slackController = Botkit.slackbot();
var slackBot = slackController.spawn({
	token: process.env.SLACK_BOT_TOKEN
});

var watsonMiddleware = require('botkit-middleware-watson')({
	username: process.env.ASSISTANT_USERNAME,
	password: process.env.ASSISTANT_PASSWORD,
	url: process.env.ASSISTANT_URL,
	workspace_id: process.env.WORKSPACE_ID,
	version: '2018-07-10',
	minimum_confidence: 0.50, // (Optional) Default is 0.75
});


// Then start assistant

slackController.middleware.receive.use(watsonMiddleware.receive);
slackBot.startRTM();

slackController.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
	if (message.watsonError) {
	  bot.reply(message, "I'm sorry, but for technical reasons I can't respond to your message");
	} else {

		var payload = {
			workspace_id: workspace_id,
			context: {}, 
			input: message
		}
	  sendToAssistant(payload);
	  bot.reply(message, message.watsonData.output.text.join('\n'));
	}
});

// app.get('/', async (req, res) => {
// 	res.send('Hello World!');
// });

// app.listen(3000, function () {
// 	console.log('Example app listening on port 3000!');
// });