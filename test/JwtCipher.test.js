var assert = require('chai').assert;
var JwtCipher = require('../lib/JwtCipher');

describe('JwtCipher', function () {
  it('Should properly export', function () {
    assert.isFunction(JwtCipher);
  });

  it('Should properly get/set secret key', function () {
    var cipher = new JwtCipher();

    assert.equal(cipher.getSecretKey(), 'DEFAULT_SECRET_KEY');
    assert.instanceOf(cipher.setSecretKey('NEW_KEY'), JwtCipher);
    assert.equal(cipher.getSecretKey(), 'NEW_KEY');
  });

  it('Should properly get/set algorithm', function () {
    var cipher = new JwtCipher();

    assert.equal(cipher.getAlgorithm(), 'HS512');
    assert.instanceOf(cipher.setAlgorithm('HS256'), JwtCipher);
    assert.equal(cipher.getAlgorithm(), 'HS256');
  });

  it('Should properly get/set expires in minutes', function () {
    var cipher = new JwtCipher();

    assert.equal(cipher.getExpiresInMinutes(), 60 * 24);
    assert.instanceOf(cipher.setExpiresInMinutes(200), JwtCipher);
    assert.equal(cipher.getExpiresInMinutes(), 200);
  });

  it('Should properly create cipher with default options', function () {
    var cipher = new JwtCipher();

    assert(cipher.getSecretKey(), 'DEFAULT_SECRET_KEY');
    assert(cipher.getAlgorithm(), 'HS512');
    assert(cipher.getExpiresInMinutes(), 60 * 24);
  });

  it('Should properly create cipher with custom options', function () {
    var cipher = new JwtCipher({
      secretKey: 'SECRET',
      algorithm: 'HS256',
      expiresInMinutes: 200
    });

    assert.equal(cipher.getSecretKey(), 'SECRET');
    assert.equal(cipher.getAlgorithm(), 'HS256');
    assert.equal(cipher.getExpiresInMinutes(), 200);
  });

  it('Should properly encode data', function () {

  });

  it('Should properly decode data', function () {

  });
});
