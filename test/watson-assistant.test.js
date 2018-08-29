var chai = require('chai');
var sendToAssistant = require('../watson-assistant');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

var payload = {
    workspace_id: process.env.WORKSPACE_ID,
    context: {}, 
    input: {'text': 'shop'}
}

describe('sendToAssistant', function() {
    it('should fulfill its promise', function(){
        return sendToAssistant(payload).should.eventually.be.fulfilled
    })
});