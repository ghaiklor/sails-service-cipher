var assert = require('chai').assert;
var BaseCipher = require('../lib/BaseCipher');

describe('BaseCipher', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseCipher);
    assert.isFunction(BaseCipher.prototype.getConfig);
    assert.isFunction(BaseCipher.prototype.setConfig);
    assert.isFunction(BaseCipher.prototype.encode);
    assert.isFunction(BaseCipher.prototype.encodeSync);
    assert.isFunction(BaseCipher.prototype.decode);
    assert.isFunction(BaseCipher.prototype.decodeSync);
  });

  it('Should properly make objects configurable', function () {
    var cipher = new BaseCipher();

    assert.notOk(cipher.getConfig('foo'));
    assert.instanceOf(cipher.setConfig('foo', 'bar'), BaseCipher);
    assert.equal(cipher.getConfig('foo'), 'bar');
  });

  it('Should properly create cipher with pre-defined config', function () {
    var cipher = new BaseCipher({
      foo: 'bar'
    });

    assert.equal(cipher.getConfig('foo'), 'bar');
    assert.notOk(cipher.getConfig('NOT_EXISTS'));
  });
});
