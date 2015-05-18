var JwtCipher = require('./JwtCipher');

module.exports = {
  create: function (type, options) {
    switch (type) {
      case 'jwt':
        return new JwtCipher(options);
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  },

  JWT: JwtCipher
};
