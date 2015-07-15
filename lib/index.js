var JwtCipher = require('./JwtCipher');

module.exports = {
  /**
   * Create cipher instance
   * @param {String} type Type of cipher
   * @param {Object} config Configuration object for cipher class
   * @returns {Object}
   */
  create: function (type, config) {
    switch (type.toLowerCase()) {
      case 'jwt':
        return new JwtCipher(config);
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  },

  JWTCipher: JwtCipher
};
