var AssistantV1 = require('watson-developer-cloud/assistant/v1');
var bot_data = require('./workspace.json');
require('dotenv').config()
var _ = require('lodash');
var {sendToDiscovery} = require('./watson-discovery');
var sendEntities = require('./sendEntities'); // Discovery function to query on entities
var sendBoth = require('./sendBoth');

var assistant = new AssistantV1({
    username: process.env.ASSISTANT_USERNAME,
    password: process.env.ASSISTANT_PASSWORD,
    version: '2018-07-10',
    url: process.env.ASSISTANT_URL
});

const CART = [];
let listArray = [];

function sendToAssistant (payload) {
  return new Promise((resolve, reject) => assistant.message(payload, function(err, res){
        if (err) {
            console.log('error: ', err);
            reject(err);
        } else {
          if (!res.output) {
            res.output = {};
          } else if (res.intents[0] === undefined) {
            resolve(res);
          } else if (res.intents[0].intent === 'discovery' || res.output.text == '') {
      
            responseText = sendToDiscovery(payload.input.text);
           
            responseText.then(function(responseText) {
              _.forEach(responseText, function (item, index) {
                listArray[index] = index + 1 + ") " + item.item + " " + item.price;
              })
              res.output.text[1] = listArray.join("\n");
              res.context.discovery_result = responseText;
              
              //console.log(res);
                  resolve(res);
              //  });
              //});
            });
          // Other else ifs here to list cart, add to cart, delete from cart, and checkout
          } else if (res.intents[0].intent === 'listItems') {
            if (CART.length === "0") {
              res.output.text[0] = "Your cart is empty"
              resolve(res);
            } else {
              res.output.text[0] = CART.join();
              resolve(res);
            }
          } else if (res.intents[0].intent === 'AddToCart' && (res.entities[0].entity === 'sys-number')){
            let sysNumber = res.entities[0].value;
            CART.push(listArray[sysNumber - 1]);
            res.output.text[0] = "Your item is added to your cart. Your cart is: " + CART.join();
            resolve(res);
          } else if (res.intents[0].intent === 'RemoveItem') {
            // code to remove item from CART array
            // search for item in cart
            // if not found, repond with "That item is not in your cart"
            // if found, take item out and then list the new cart
            if (res.entities[0].entity === 'sys-number') {
              let itemNum = res.entities[0].value - 1;
              console.log(itemNum);
              if (!itemNum) {
                res.output.text[0] = "That item is not in your cart"
                resolve(res);
              } else {
                CART.splice(itemNum, 1);
                res.output.text[0] = "Okay. Item #" + itemNum + " was removed from your cart."
                resolve(res);
              }
            }
          } else if (res.intents[0].intent === 'Checkout') {
            res.output.text[0] = "Okay. Your purchase is complete. Here is what you bought: " + CART.join();
            CART.splice(0, CART.length);
            resolve(res);
          } else {
            resolve(res);
          }
        }
    }));
}

// function updateMessage(input, response) {
//     return new Promise(function(resolve, reject) {
//       var responseText = null;
//       var responseTextEntity = null;
//       var responseTextBoth = null;
  
//       if (!response.output) {
//         response.output = {};
//       } else if (response.intents[0] === undefined) {
//         resolve(response);
//       } else if (response.intents[0].intent === 'discovery' || response.output.text == '') {
  
//         responseText = sendToDiscovery(input.input.text);
//         responseTextEntity = sendEntities(response);
//         responseTextBoth = sendBoth(input.input.text, response);
  
//         // Three responses are given in an array, but sent through as one message
//         responseText.then(function(responseText) {

//           response.output.text[0] = responseText;
//           response.context.discovery_result = responseText;
//           // responseTextEntity.then(function(responseTextEntity) {
//           //   //console.log(responseTextEntity);
//           //   response.output.text.push(responseTextEntity);
//           //   responseTextBoth.then(function(responseTextBoth) {
//           //     response.output.text.push(responseTextBoth);
//           // console.log(response);
//               resolve(response);
//           //  });
//           //});
//         });
//       // Other else ifs here to list cart, add to cart, delete from cart, and checkout
//       // Another function/module(?) to handle everything for a cart?
//       } else {
//         resolve(response);
//       }
//     });
//   }
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