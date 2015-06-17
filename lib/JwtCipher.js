var util = require('util');
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var BaseCipher = require('./BaseCipher');

/**
 * Secret key for symmetric encoding
 * @type {String}
 * @private
 */
var SECRET_KEY = 'DEFAULT_SECRET_KEY';

/**
 * Algorithm that using for signing JWT
 * @type {String}
 * @private
 */
var ALGORITHM = 'HS512';

/**
 * Time interval in minutes when token will be expired or false if not expires
 * @type {Number}
 * @private
 */
var EXPIRES_IN_MINUTES = 60 * 24;

util.inherits(JwtCipher, BaseCipher);

/**
 * Create new JWT Cipher instance
 * @constructor
 */
function JwtCipher() {
  BaseCipher.apply(this, arguments);
}

/**
 * Get current secret key
 * @returns {String}
 */
JwtCipher.prototype.getSecretKey = function () {
  return this.getConfig('secretKey') || SECRET_KEY;
};

/**
 * Set new secret key
 * @param {String} secret
 * @returns {JwtCipher}
 */
JwtCipher.prototype.setSecretKey = function (secret) {
  this.setConfig('secretKey', secret);
  return this;
};

/**
 * Get current algorithm
 * @returns {String}
 */
JwtCipher.prototype.getAlgorithm = function () {
  return this.getConfig('algorithm') || ALGORITHM;
};

/**
 * Set new algorithm
 * @param {String} algorithm
 * @returns {JwtCipher}
 */
JwtCipher.prototype.setAlgorithm = function (algorithm) {
  this.setConfig('algorithm', algorithm);
  return this;
};

/**
 * Get expires interval in minutes
 * @returns {Number}
 */
JwtCipher.prototype.getExpiresInMinutes = function () {
  return this.getConfig('expiresInMinutes') || EXPIRES_IN_MINUTES;
};

/**
 * Set new expires interval in minutes
 * @param {Number} time
 * @returns {JwtCipher}
 */
JwtCipher.prototype.setExpiresInMinutes = function (time) {
  this.setConfig('expiresInMinutes', time);
  return this;
};

/**
 * Encode cipher
 * @param {Object} data Data to encode
 * @param {Object} [options] Additional options for jwt.sign
 * @returns {Promise.resolve}
 */
JwtCipher.prototype.encode = function (data, options) {
  return Promise.resolve(this.encodeSync.apply(this, arguments));
};

/**
 * Encode data to JSON Web Token
 * @param {Object} data Data that need to encode
 * @param {Object} [_options] Specify options for jwt.sign
 * @returns {String} Returns JSON Web Token in string format
 */
JwtCipher.prototype.encodeSync = function (data, _options) {
  var options = _options || {};
  options.algorithm = options.algorithm || this.getAlgorithm();
  options.expiresInMinutes = options.expiresInMinutes || this.getExpiresInMinutes();

  return jwt.sign(data, this.getSecretKey(), options);
};

/**
 * Decode token in async mode
 * @param {Object} data Data to decode
 * @param {Object} [_options] Options for jwt.verify
 * @returns {Object}
 */
JwtCipher.prototype.decode = function (data, _options) {
  var options = _options || {};

  return new Promise(function (resolve, reject) {
    jwt.verify(data, this.getSecretKey(), options, function (error, decoded) {
      return error ? reject(error) : resolve(decoded);
    });
  }.bind(this));
};

/**
 * Decode token in sync mode
 * @param {Object} data Data to decode
 * @param {Object} [_options] Advanced options for jwt.verify
 * @returns {*}
 */
JwtCipher.prototype.decodeSync = function (data, _options) {
  var options = _options || {};
  return jwt.verify(data, this.getSecretKey(), options);
};

module.exports = JwtCipher;
