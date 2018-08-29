var chai = require('chai');
var {sendToDiscovery} = require('../watson-discovery');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

let query = "hat";

describe('sendToDiscovery', function() {
    it('should fulfill its promise', function(){
        return sendToDiscovery(query).should.eventually.be.fulfilled
    })
});