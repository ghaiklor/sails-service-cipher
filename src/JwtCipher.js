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
 * Time interval when token will be expired or false if not expires
 * @type {String|Number}
 * @private
 */
const EXPIRES_IN = '24h';

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
   * @param {String} _secret
   * @returns {JwtCipher}
   */
  setSecretKey(_secret) {
    this.set('secretKey', _secret);
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
   * @param {String} _algorithm
   * @returns {JwtCipher}
   */
  setAlgorithm(_algorithm) {
    this.set('algorithm', _algorithm);
    return this;
  }

  /**
   * Get expires interval
   * @returns {String|Number}
   */
  getExpiresIn() {
    let expiresIn = this.get('expiresIn');
    return expiresIn === false ? expiresIn : expiresIn || EXPIRES_IN;
  }

  /**
   * Set expires interval
   * @param {String|Number} _time
   * @returns {JwtCipher}
   */
  setExpiresIn(_time) {
    this.set('expiresIn', _time);
    return this;
  }

  /**
   * Encode cipher
   * @param {Object} _data Data to encode
   * @param {Object} [_config] Additional options for jwt.sign
   * @returns {Promise.resolve}
   */
  encode(_data, _config) {
    return Promise.resolve(this.encodeSync(_data, _config));
  }

  /**
   * Encode data to JSON Web Token
   * @param {Object} _data Data that need to encode
   * @param {Object} [_config] Specify options for jwt.sign
   * @returns {String} Returns JSON Web Token in string format
   */
  encodeSync(_data, _config) {
    let config = _.merge({}, this.get(), {
      algorithm: this.getAlgorithm(),
      expiresIn: this.getExpiresIn(),
      secretKey: this.getSecretKey()
    }, _config);

    return jwt.sign(_data, config.secretKey, config);
  }

  /**
   * Decode token in async mode
   * @param {Object} _data Data to decode
   * @param {Object} [_config] Options for jwt.verify
   * @returns {Object}
   */
  decode(_data, _config) {
    let config = _.merge({}, this.get(), {
      secretKey: this.getSecretKey()
    }, _config);

    return new Promise((resolve, reject) => {
      jwt.verify(_data, config.secretKey, config, (error, decoded) => error ? reject(error) : resolve(decoded));
    });
  }

  /**
   * Decode token in sync mode
   * @param {Object} _data Data to decode
   * @param {Object} [_config] Advanced options for jwt.verify
   * @returns {*}
   */
  decodeSync(_data, _config) {
    let config = _.merge({}, this.get(), {
      secretKey: this.getSecretKey()
    }, _config);

    return jwt.verify(_data, config.secretKey, config);
  }
}
