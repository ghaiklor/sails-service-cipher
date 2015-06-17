var assert = require('chai').assert;
var CipherService = require('../');
var JWTCipher = require('../lib/JwtCipher');

describe('CipherFactory', function () {
  it('Should properly export', function () {
    assert.isObject(CipherService);
    assert.isFunction(CipherService.create);
    assert.isFunction(CipherService.JWT);
  });

  it('Should properly throw error if type is unrecognized', function () {
    assert.throw(function () {
      CipherService.create('NOT_EXISTS');
    }, Error);
  });

  it('Should properly create JWT cipher', function () {
    var cipher = CipherService.create('jwt');
    assert.instanceOf(cipher, JWTCipher);
  });

  it('Should properly encode/decode data', function () {
    var cipher = CipherService.create('jwt');
    assert.typeOf(cipher.encodeSync('test'), 'string');
  });
});
