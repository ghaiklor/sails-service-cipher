var assert = require('chai').assert;
var JwtCipher = require('../lib/JwtCipher');

var TEST_STRING = 'TEST_STRING';
var TEST_STRING_IN_JWT = 'eyJhbGciOiJIUzUxMiJ9.VEVTVF9TVFJJTkc.G3DzFWlnOoJRG2Fqq_q2SNTB560DPVgNOh9LagBC3eY1rg3a-SE5ydMzxkccoF_EwRBmASQMSHXSnizYIkxjfw';

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

  it('Should properly encode data', function (done) {
    var cipher = new JwtCipher();

    cipher.encode(TEST_STRING).then(function (result) {
      assert.equal(result, TEST_STRING_IN_JWT);
      done();
    });
  });

  it('Should properly encode data in sync', function () {
    var cipher = new JwtCipher();
    assert.equal(cipher.encodeSync(TEST_STRING), TEST_STRING_IN_JWT);
  });

  it('Should properly decode data', function (done) {
    var cipher = new JwtCipher();

    cipher.decode(TEST_STRING_IN_JWT).then(function (result) {
      assert.equal(TEST_STRING, result);
      done();
    });
  });

  it('Should properly decode data in sync', function () {
    var cipher = new JwtCipher();
    assert.equal(cipher.decodeSync(TEST_STRING_IN_JWT), TEST_STRING);
  });
});
