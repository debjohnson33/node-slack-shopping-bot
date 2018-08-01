var AssistantV1 = require('watson-developer-cloud/assistant/v1');
var bot_data = require('./workspace.json');
require('dotenv').config()

var assistant = new AssistantV1({
    username: process.env.ASSISTANT_USERNAME,
    password: process.env.ASSISTANT_PASSWORD,
    version: '2018-07-10',
    url: process.env.ASSISTANT_URL
});

function sendToAssistant (workspace_id, input) {
    assistant.message({
        workspace_id: workspace_id, 
        input: input}, function(err, res){
            if (err) {
                console.log('error: ', err);
            } else {
                console.log(JSON.stringify(res, null, 2));
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