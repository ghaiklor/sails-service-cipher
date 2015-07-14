var _ = require('lodash');

/**
 * BaseCipher class
 * @param {Object} [_config] Configuration object
 * @constructor
 */
function BaseCipher(_config) {
  this._config = {};

  _.forOwn(_config, function (value, key) {
    this.set(key, value);
  }.bind(this))
}

/**
 * Get configuration value
 * @param {String} [path]
 * @returns {*}
 */
BaseCipher.prototype.get = function (path) {
  return typeof path === 'undefined' ? this._config : _.get(this._config, path);
};

/**
 * Set configuration value
 * @param {String} path
 * @param {*} value
 * @returns {BaseCipher}
 */
BaseCipher.prototype.set = function (path, value) {
  _.set(this._config, path, value);
  return this;
};

BaseCipher.prototype.encode = _;
BaseCipher.prototype.encodeSync = _;
BaseCipher.prototype.decode = _;
BaseCipher.prototype.decodeSync = _;

module.exports = BaseCipher;
