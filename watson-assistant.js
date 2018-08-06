var AssistantV1 = require('watson-developer-cloud/assistant/v1');
var bot_data = require('./workspace.json');
require('dotenv').config()
var {sendToDiscovery} = require('./watson-discovery');
var sendEntities = require('./sendEntities'); // Discovery function to query on entities
var sendBoth = require('./sendBoth');

var assistant = new AssistantV1({
    username: process.env.ASSISTANT_USERNAME,
    password: process.env.ASSISTANT_PASSWORD,
    version: '2018-07-10',
    url: process.env.ASSISTANT_URL
});

function sendToAssistant (payload) {
  return new Promise((resolve, reject) => assistant.message(payload, function(err, res){
        if (err) {
            console.log('error: ', err);
            reject(err);
        } else {
          updateMessage(payload, res)
            .then(resolve(res));
        }
    }));
}

function updateMessage(input, response) {
    return new Promise(function(resolve, reject) {
      var responseText = null;
      var responseTextEntity = null;
      var responseTextBoth = null;
  
      if (!response.output) {
        response.output = {};
      } else if (response.intents[0] === undefined) {
        resolve(response);
      } else if (response.intents[0].intent === 'discovery' || response.output.text == '') {
  
        responseText = sendToDiscovery(input.input.text);
        responseTextEntity = sendEntities(response);
        responseTextBoth = sendBoth(input.input.text, response);
  
        // Three responses are given in an array, but sent through as one message
        responseText.then(function(responseText) {
          response.output.text[0] = responseText;
          responseTextEntity.then(function(responseTextEntity) {
            console.log(responseTextEntity);
            response.output.text.push(responseTextEntity);
            responseTextBoth.then(function(responseTextBoth) {
              response.output.text.push(responseTextBoth);
              resolve(response);
            });
          });
        });
      } else {
        resolve(response);
      }
    });
  }
// Code for adding a workspace and below that adding a dialog node
// var workspace = {
//     name: 'Online shopping chatbot',
//     description: 'Workspace for online shopping assistant bot.',
//     intents: bot_data.intents,
//     entities: bot_data.entities,
//     dialog_nodes: bot_data.dialog_nodes
// };

// assistant.createWorkspace(workspace, function(err, res) {
//     if (err) {
//         console.log(err);
//     } else {
//         workspace_id = res.workspace_id;
//         console.log("Created workspace: " + workspace_id);
//     }
// });

// var params = {
//     workspace_id: 'f6f399b9-2298-4895-8a67-5e738722265b',
//     dialog_node: 'shop',
//     conditions:'#Shop',
//     output: {
//       text: 'What do you want to shop for?'
//     },
//     title: 'Shopping'
// };
  
// assistant.createDialogNode(params, function(err, response) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(JSON.stringify(response, null, 2));
//     }
// });

module.exports = sendToAssistant;