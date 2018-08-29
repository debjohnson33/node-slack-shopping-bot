var chai = require('chai');
var asyncFetchData = require('../async');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

// Should have local server running at localhost:3001
// Or a live website to retrieve products from
describe('asyncFetchData', function() {
    it('should fulfill its promise', function(){
        return asyncFetchData().should.eventually.be.fulfilled
    })
});