import { assert } from 'chai';
import BaseCipher from '../../src/BaseCipher';

describe('BaseCipher', () => {
  it('Should properly export', () => {
    assert.isFunction(BaseCipher);
  });

  it('Should properly make objects configurable', () => {
    let cipher = new BaseCipher();

    assert.notOk(cipher.get('foo'));
    assert.instanceOf(cipher.set('foo', 'bar'), BaseCipher);
    assert.instanceOf(cipher.set('obj', {foo: 'bar'}), BaseCipher);
    assert.deepEqual(cipher.get('obj'), {foo: 'bar'});
    assert.equal(cipher.get('obj.foo'), 'bar');
    assert.equal(cipher.get('foo'), 'bar');
  });

  it('Should properly create cipher with pre-defined config', () => {
    let cipher = new BaseCipher({
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
