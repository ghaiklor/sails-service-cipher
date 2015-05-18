var assert = require('chai').assert;
var CipherService = require('../');

describe('CipherFactory', function () {
  it('Should properly export', function () {
    assert.isObject(CipherService);
    assert.isFunction(CipherService.create);
    assert.isFunction(CipherService.JWT);
  });
});
