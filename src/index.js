import JwtCipher from './JwtCipher';

var cipher = {
  jwt: JwtCipher
};

/**
 * Create cipher instance
 * @param {String} type Type of cipher
 * @param {Object} [config] Configuration object for cipher class
 * @returns {Object}
 */
export default function (type, config) {
  if (cipher[type.toLowerCase()] instanceof Function) {
    return new cipher[type.toLowerCase()](config);
  } else {
    throw new Error('Unrecognized type -> ' + type);
  }
}
