# Changelog

## 3.0.1

- Typo fixes in documentation;

## 3.0.0

- Migration from ES5 to ES6 syntax;
- Remove `.create()` method from CipherService. CipherService is a function now which you can call with `CipherService('jwt')`;

## 2.0.0

- Replace `getConfig()` and `setConfig()` with `get()` and `set()` methods;
- Setting `expiresInMinutes` to `false` will make non-expiry token;
- Merging all pre-defined config in each of decode\encode methods;
- Add more tests for JWT, so test coverage is 100% now;
- Optimized `create` method;
- Update docs;

## 1.1.0

- Implement overriding config on encode/decode for JWT;

## 1.0.1

- Update docs;
- Change name of JWTCipher export;

## 1.0.0

- Add full support for JWT encode\decode;

## 0.1.0

- Initial release;
