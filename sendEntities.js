function sendEntities(conversationResponse) {
  return new Promise(function(resolve, reject) {
    var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
    var generateEntityArray = require('./generateEntityArray.js');

    var discovery = new DiscoveryV1({
      username: process.env.DISCOVERY_USERNAME,
      password: process.env.DISCOVERY_PASSWORD,
      version_date: '2017-06-25'
    });

    var environment_id = process.env.DISCOVERY_ENVIRONMENT_ID;
    var collection_id = process.env.DISCOVERY_COLLECTION_ID;

    entityQuery = generateEntityArray(conversationResponse);

    //console.log(entityQuery);

    discovery.query({
      environment_id: environment_id,
      collection_id: collection_id,
      query: entityQuery
    }, function(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve([data.results[0].title,data.results[0].category, data.results[0].product_page]);
        }
    });
  });
}

module.exports = sendEntities;
