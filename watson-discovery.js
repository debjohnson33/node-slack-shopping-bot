var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var fs = require('fs');
require('dotenv').config()

var discovery = new DiscoveryV1({
  username: process.env.DISCOVERY_USERNAME, 
  password: process.env.DISCOVERY_PASSWORD,
  version: '2018-05-04',
  url: process.env.DISCOVERY_URL
});

// Use readdir to read the filenames from the directory, 
// then forEach to read each file and add document (code below)

fs.readdir('./data', (err, files) => {
  files.forEach(fileName => {
    console.log(fileName);
    var fileBuffered = fs.readFileSync('./data/' + fileName);
    var document_obj = {
      environment_id: process.env.DISCOVERY_ENVIRONMENT_ID, 
      collection_id: process.env.DISCOVERY_COLLECTION_ID, 
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
})

