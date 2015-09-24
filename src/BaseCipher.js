import _ from 'lodash';

export default class BaseCipher {
  constructor(_config) {
    this._config = {};
    _.assign(this._config, _config);
  }

  /**
   * Get configuration value
   * @param {String} [path]
   * @returns {*}
   */
  get(path) {
    return typeof path === 'undefined' ? this._config : _.get(this._config, path);
  }

  /**
   * Set configuration value
   * @param {String} path
   * @param {*} value
   * @returns {BaseCipher}
   */
  set(path, value) {
    _.set(this._config, path, value);
    return this;
  }
}
