var assert = require('chai').assert;
var BaseCipher = require('../lib/BaseCipher');

describe('BaseCipher', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseCipher);
    assert.isFunction(BaseCipher.prototype.get);
    assert.isFunction(BaseCipher.prototype.set);
    assert.isFunction(BaseCipher.prototype.encode);
    assert.isFunction(BaseCipher.prototype.encodeSync);
    assert.isFunction(BaseCipher.prototype.decode);
    assert.isFunction(BaseCipher.prototype.decodeSync);
  });

  it('Should properly make objects configurable', function () {
    var cipher = new BaseCipher();

    assert.notOk(cipher.get('foo'));
    assert.instanceOf(cipher.set('foo', 'bar'), BaseCipher);
    assert.instanceOf(cipher.set('obj', {foo: 'bar'}), BaseCipher);
    assert.deepEqual(cipher.get('obj'), {foo: 'bar'});
    assert.equal(cipher.get('obj.foo'), 'bar');
    assert.equal(cipher.get('foo'), 'bar');
  });

  it('Should properly create cipher with pre-defined config', function () {
    var cipher = new BaseCipher({
      foo: 'bar',
      obj: {
        foo: 'bar'
      }
    });

    assert.equal(cipher.get('foo'), 'bar');
    assert.equal(cipher.get('obj.foo'), 'bar');
    assert.deepEqual(cipher.get('obj'), {foo: 'bar'});
    assert.notOk(cipher.get('NOT_EXISTS'));
  });
});
