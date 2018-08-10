var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var fs = require('fs');
require('dotenv').config()

var discovery = new DiscoveryV1({
  username: process.env.DISCOVERY_USERNAME, 
  password: process.env.DISCOVERY_PASSWORD,
  version: '2018-05-04',
  url: process.env.DISCOVERY_URL
});

var environment_id = process.env.DISCOVERY_ENVIRONMENT_ID;
var collection_id = process.env.DISCOVERY_COLLECTION_ID;

// Use forEach to read each file and add document

function sendDocsToDiscovery (path, files) {
  files.forEach(fileName => {
    console.log(fileName);
    var fileBuffered = fs.readFileSync('./data/' + fileName);
    var document_obj = {
      environment_id: environment_id, 
      collection_id: collection_id, 
      file: {
        value: Buffer.from(fileBuffered, 'utf8'),
        options: {
          filename: fileName
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
  });
}

function sendToDiscovery(query) {
  return new Promise(function(resolve, reject) {
    discovery.query({
      environment_id: environment_id,
      collection_id: collection_id,
      query: 'category:' + query // only querying the text field
    }, function(error, data) {
        if (error) {
          reject(error);
        } else {
          if (data.results == null) {
            console.log("Your call to Discovery was complete, but it didn't return a response. Try checking your Discovery data format.");
            reject(error);
          } else {
            console.log(JSON.stringify(data.results[0].product_page, null, 2));
            resolve([data.results[0].title,data.results[0].category, data.results[0].product_page]);
          }
        }
    });
  });
}

module.exports = {sendDocsToDiscovery, sendToDiscovery};
