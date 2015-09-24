import _ from 'lodash';
import jwt from 'jsonwebtoken';
import BaseCipher from './BaseCipher';

/**
 * Secret key for symmetric encoding
 * @type {String}
 * @private
 */
const SECRET_KEY = 'DEFAULT_SECRET_KEY';

/**
 * Algorithm that using for signing JWT
 * @type {String}
 * @private
 */
const ALGORITHM = 'HS512';

/**
 * Time interval in minutes when token will be expired or false if not expires
 * @type {Number}
 * @private
 */
const EXPIRES_IN_MINUTES = 60 * 24;

export default class JwtCipher extends BaseCipher {
  constructor(...args) {
    super(...args);
  }

  /**
   * Get current secret key
   * @returns {String}
   */
  getSecretKey() {
    return this.get('secretKey') || SECRET_KEY;
  }

  /**
   * Set new secret key
   * @param {String} secret
   * @returns {JwtCipher}
   */
  setSecretKey(secret) {
    this.set('secretKey', secret);
    return this;
  }

  /**
   * Get current algorithm
   * @returns {String}
   */
  getAlgorithm() {
    return this.get('algorithm') || ALGORITHM;
  }

  /**
   * Set new algorithm
   * @param {String} algorithm
   * @returns {JwtCipher}
   */
  setAlgorithm(algorithm) {
    this.set('algorithm', algorithm);
    return this;
  }

  /**
   * Get expires interval in minutes
   * @returns {Number}
   */
  getExpiresInMinutes() {
    let expiresInMinutes = this.get('expiresInMinutes');
    return expiresInMinutes === false ? expiresInMinutes : expiresInMinutes || EXPIRES_IN_MINUTES;
  }

  setExpiresInMinutes(time) {
    this.set('expiresInMinutes', time);
    return this;
  }

  /**
   * Encode cipher
   * @param {Object} data Data to encode
   * @param {Object} [config] Additional options for jwt.sign
   * @returns {Promise.resolve}
   */
  encode(data, config) {
    return Promise.resolve(this.encodeSync(_data, _config));
  }

  /**
   * Encode data to JSON Web Token
   * @param {Object} data Data that need to encode
   * @param {Object} [_config] Specify options for jwt.sign
   * @returns {String} Returns JSON Web Token in string format
   */
  encodeSync(data, _config) {
    let config = _.merge({}, this.get(), {
      algorithm: this.getAlgorithm(),
      expiresInMinutes: this.getExpiresInMinutes(),
      secretKey: this.getSecretKey()
    }, _config);

    return jwt.sign(data, config.secretKey, config);
  }

  /**
   * Decode token in async mode
   * @param {Object} data Data to decode
   * @param {Object} [_config] Options for jwt.verify
   * @returns {Object}
   */
  decode(data, _config) {
    let config = _.merge({}, this.get(), {
      secretKey: this.getSecretKey()
    }, _config);

    return new Promise((resolve, reject) => {
      jwt.verify(data, config.secretKey, config, (error, decoded) => error ? reject(error) : resolve(decoded));
    });
  }

  /**
   * Decode token in sync mode
   * @param {Object} data Data to decode
   * @param {Object} [_config] Advanced options for jwt.verify
   * @returns {*}
   */
  decodeSync(data, _config) {
    let config = _.merge({}, this.get(), {
      secretKey: this.getSecretKey()
    }, _config);

    return jwt.verify(data, config.secretKey, config);
  }
}
