var util = require('util');
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var BaseCipher = require('./BaseCipher');

/**
 * Secret key for symmetric encoding
 * @type {String}
 * @private
 */
var SECRET_KEY = "DEFAULT_SECRET_KEY";

/**
 * Algorithm that using for signing JWT
 * @type {String}
 * @private
 */
var ALGORITHM = "HS512";

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
  return this.getConfig('SECRET_KEY') || SECRET_KEY;
};

/**
 * Set new secret key
 * @param {String} secret
 * @returns {JwtCipher}
 */
JwtCipher.prototype.setSecretKey = function (secret) {
  this.setConfig('SECRET_KEY', secret);
  return this;
};

/**
 * Get current algorithm
 * @returns {String}
 */
JwtCipher.prototype.getAlgorithm = function () {
  return this._algorithm || ALGORITHM;
};

/**
 * Set new algorithm
 * @param {String} algorithm
 * @returns {JwtCipher}
 */
JwtCipher.prototype.setAlgorithm = function (algorithm) {
  this._algorithm = algorithm;
  return this;
};

/**
 * Get expires interval in minutes
 * @returns {Number}
 */
JwtCipher.prototype.getExpiresInMinutes = function () {
  return this._expiresInMinutes || EXPIRES_IN_MINUTES;
};

/**
 * Set new expires interval in minutes
 * @param {Number} time
 * @returns {JwtCipher}
 */
JwtCipher.prototype.setExpiresInMinutes = function (time) {
  this._expiresInMinutes = time;
  return this;
};

/**
 * Encode cipher
 * @returns {Promise.resolve}
 */
JwtCipher.prototype.encode = function () {
  return Promise.resolve(this.encodeSync())
};

/**
 * Encode data with JSON Web Token
 * @param {Object} [_options] Specify options for jwt.sign
 * @returns {String} Returns JSON Web Token in string format
 */
JwtCipher.prototype.encodeSync = function (_options) {
  var options = _options || {};
  options.algorithm = options.algorithm || ALGORITHM;
  options.expiresInMinutes = options.expiresInMinutes || EXPIRES_IN_MINUTES;

  return jwt.sign(this.getContent(), SECRET_KEY, options);
};

/**
 * Decode token in async mode
 * @returns {Object}
 */
JwtCipher.prototype.decode = function (_options) {
  var options = _options || {};

  return new Promise(function (resolve, reject) {
    jwt.verify(this.getContent(), SECRET_KEY, options, function (error, decoded) {
      return error ? reject(error) : resolve(decoded);
    });
  });
};

/**
 * Decode token in sync mode
 * @param _options
 * @returns {*}
 */
JwtCipher.prototype.decodeSync = function (_options) {
  var options = _options || {};
  return jwt.verify(this.getContent(), SECRET_KEY, options);
};

module.exports = JwtCipher;
