var assert = require('chai').assert;
var Promise = require('bluebird');
var JwtCipher = require('../lib/JwtCipher');

var TEST_STRING = 'TEST_STRING';
var TEST_STRING_IN_JWT = 'eyJhbGciOiJIUzUxMiJ9.VEVTVF9TVFJJTkc.G3DzFWlnOoJRG2Fqq_q2SNTB560DPVgNOh9LagBC3eY1rg3a-SE5ydMzxkccoF_EwRBmASQMSHXSnizYIkxjfw';

var TEST_OBJECT = {foo: 'bar'};
var TEST_OBJECT_IN_JWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJmb28iOiJiYXIifQ.F749NScuZA0Ql5H_XWhkhGuasHeBOLN3xRDis8dnEOuiUMh-SGYQo6ZAYcnxQoBpE818Lvwr9AkMZ6K-IqmaFA';

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
      expiresInMinutes: 200,
      noTimestamp: true
    });

    assert.equal(cipher.getSecretKey(), 'SECRET');
    assert.equal(cipher.getAlgorithm(), 'HS256');
    assert.equal(cipher.getExpiresInMinutes(), 200);
    assert.equal(cipher.get('noTimestamp'), true);
  });

  it('Should properly encode data', function (done) {
    var cipher = new JwtCipher({
      expiresInMinutes: false,
      noTimestamp: true
    });

    Promise.all([cipher.encode(TEST_STRING), cipher.encode(TEST_OBJECT)]).spread(function (string, object) {
      assert.equal(string, TEST_STRING_IN_JWT);
      assert.equal(object, TEST_OBJECT_IN_JWT);
      done();
    });
  });

  it('Should properly encode data in sync', function () {
    var cipher = new JwtCipher({
      expiresInMinutes: false,
      noTimestamp: true
    });

    assert.equal(cipher.encodeSync(TEST_STRING), TEST_STRING_IN_JWT);
    assert.equal(cipher.encodeSync(TEST_OBJECT), TEST_OBJECT_IN_JWT);
  });

  it('Should properly decode data', function (done) {
    var cipher = new JwtCipher({
      expiresInMinutes: false,
      noTimestamp: true
    });

    Promise.all([cipher.decode(TEST_STRING_IN_JWT), cipher.decode(TEST_OBJECT_IN_JWT)]).spread(function (string, object) {
      assert.equal(TEST_STRING, string);
      assert.deepEqual(TEST_OBJECT, object);
      done();
    });
  });

  it('Should properly decode data in sync', function () {
    var cipher = new JwtCipher({
      expiresInMinutes: false,
      noTimestamp: true
    });

    assert.equal(cipher.decodeSync(TEST_STRING_IN_JWT), TEST_STRING);
    assert.deepEqual(cipher.decodeSync(TEST_OBJECT_IN_JWT), TEST_OBJECT);
  });

  it('Should properly override config on encode/decode', function () {
    var cipher = new JwtCipher();
    var jwt = cipher.encodeSync(TEST_STRING, {
      secretKey: 'ANOTHER_KEY'
    });

    assert.throw(function () {
      cipher.decodeSync(jwt);
    }, Error);

    assert.equal(cipher.decodeSync(jwt, {
      secretKey: 'ANOTHER_KEY'
    }), TEST_STRING);
  });
});
