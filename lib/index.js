var ciphers = {
  jwt: require('./JwtCipher')
};

module.exports = {
  /**
   * Create cipher instance
   * @param {String} type Type of cipher
   * @param {Object} config Configuration object for cipher class
   * @returns {Object}
   */
  create: function (type, config) {
    if (ciphers[type.toLowerCase()] instanceof Function) {
      return new ciphers[type.toLowerCase()](config);
    } else {
      throw new Error('Unrecognized type -> ' + type);
    }
  },

  JwtCipher: ciphers.jwt
};
