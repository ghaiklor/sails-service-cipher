import JwtCipher from './JwtCipher';

var ciphers = {
  jwt: JwtCipher
};

/**
 * Create cipher instance
 * @param {String} type Type of cipher
 * @param {Object} [config] Configuration object for cipher class
 * @returns {Object}
 */
export default function (type, config) {
  if (ciphers[type.toLowerCase()] instanceof Function) {
    return new ciphers[type.toLowerCase()](config);
  } else {
    throw new Error('Unrecognized type -> ' + type);
  }
}
