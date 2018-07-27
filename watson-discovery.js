var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var fs = require('fs');
require('dotenv').config()

var discovery = new DiscoveryV1({
  username: process.env.DISCOVERY_USERNAME, //|| '<discovery_username>'
  password: process.env.DISCOVERY_PASSWORD,// || '<discovery_password>',
  version: '2018-05-04',
  url: process.env.DISCOVERY_URL
});

// Iterate through the json data's product array - Maybe with lodash
// Make each product object in product array into a separate json file with product name 
// as the file name - using fs function
// Then use for loop? to read each file and add document (code below)

var file = fs.readFileSync('./data.json');

var document_obj = {
  environment_id: process.env.DISCOVERY_ENVIRONMENT_ID, 
  collection_id: process.env.DISCOVERY_COLLECTION_ID, 
  file: {
    value: Buffer.from(file, 'utf8'),
    options: {
      filename: 'data.json'
    }
  }
}

discovery.addDocument(document_obj,
function(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }  
});