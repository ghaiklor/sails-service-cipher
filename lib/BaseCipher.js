/**
 * Message for implement method
 * @type {String}
 */
var IMPLEMENT_MESSAGE = "Not implemented";

/**
 * BaseCipher class
 * @constructor
 */
function BaseCipher(_config) {
  var config = _config || {};

  Object.keys(config).forEach(function (key) {
    this.setConfig(key, config[key]);
  }.bind(this));
}

BaseCipher.prototype = {
  /**
   * Get configuration value
   * @param {String} key
   * @returns {*}
   */
  getConfig: function (key) {
    return typeof key === 'undefined' ? this.config : this._config && this._config[key];
  },

  /**
   * Set configuration value
   * @param {String} key
   * @param {*} value
   * @returns {BaseCipher}
   */
  setConfig: function (key, value) {
    this._config = this._config || {};
    this._config[key] = value;
    return this;
  },

  /**
   * Encode current data
   */
  encode: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  },

  /**
   * Encode current data in sync
   */
  encodeSync: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  },

  /**
   * Decode current data
   */
  decode: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  },

  /**
   * Decode current data in sync
   */
  decodeSync: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  }
};

module.exports = BaseCipher;
