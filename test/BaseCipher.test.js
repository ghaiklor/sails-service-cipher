var assert = require('chai').assert;
var BaseCipher = require('../lib/BaseCipher');

describe('BaseCipher', function () {
  it('Should properly export', function () {
    assert.isObject(BaseCipher);
    assert.isFunction(BaseCipher.prototype.getData);
    assert.isFunction(BaseCipher.prototype.setData);
    assert.isFunction(BaseCipher.prototype.encode);
    assert.isFunction(BaseCipher.prototype.encodeSync);
    assert.isFunction(BaseCipher.prototype.decode);
    assert.isFunction(BaseCipher.prototype.decodeSync);
  });
});
