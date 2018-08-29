var chai = require('chai');
var asyncFetchData = require('../async');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

describe('asyncFetchData', function() {
    it('should fulfill its promise', function(){
        return asyncFetchData().should.eventually.be.fulfilled
    })
});