# Node Watson Assistant and Discovery with Slack

## Before you begin

Sign up for an IBM Cloud account
Create a Watson Assistant Service and use the workspace.json file to start a new workspace

Create a Watson Discovery Service and upload documents (can be html, doc, json, or pdf)

Go to Slack and create an app, then add a bot user to it

Create a .env file based on the env.sample and put all your credentials there. Make sure .env is in your .gitignore file

Run ```npm install```

Then ```npm start```

The console should say "RTM websocket opened" and once it does you should see your bot activated in Slack.

You can direct message it or call it using the name you gave it (i.e. @shopbot or what you named it) and then say you want to shop. You will have to know what products you have loaded in your Discovery to know what to ask for, but then the bot will give you a list to choose from. Tell the bot you want to add an item by saying "add" and then the number of the item.

When you are done adding to your cart, tell the bot you want to checkout. If you are done shopping, tell it goodbye and it will give you a goodbye message.
