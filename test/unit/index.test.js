import { assert } from 'chai';
import CipherService from '../../src/index';
import JwtCipher from '../../src/JwtCipher';

describe('CipherService', () => {
  it('Should properly export', () => {
    assert.isFunction(CipherService);
  });

  it('Should properly create JWT cipher', () => {
    let cipher = CipherService('jwt');
    assert.instanceOf(cipher, JwtCipher);
  });

  it('Should properly encode/decode data', () => {
    let cipher = CipherService('jwt');
    assert.typeOf(cipher.encodeSync('test'), 'string');
  });

  it('Should properly throw error if type is unrecognized', () => {
    assert.throw(() => CipherService.create('NOT_EXISTS'), Error);
  });
});
