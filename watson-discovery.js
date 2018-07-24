var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var fs = require('fs');

var discovery = new DiscoveryV1({
  version: '2018-03-05',
  username: process.env.DISCOVERY_USERNAME,
  password: process.env.DISCOVERY_PASSWORD
});

// discovery.createCollection(
//     { environment_id: 'process.env.DISCOVERY_ENVIRONMENT_ID', collection_name: 'process.env.DISCOVERY_COLLECTION_ID', name: 'watson-online-shopping', description: 'online shopping', configuration_id: 'process.env.DISCOVERY_CONFIGURATION_ID'}), 
//     function(error, data) {
//     console.log(JSON.stringify(data, null, 2));
// };

var file = fs.readFileSync('./data.json');

discovery.addDocument(
    { environment_id: process.env.DISCOVERY_ENVIRONMENT_ID, collection_id: process.env.DISCOVERY_COLLECTION_ID, file: file }),
function(error, data) {
  console.log(JSON.stringify(data, null, 2));
};