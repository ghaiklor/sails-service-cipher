# sails-service-cipher

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-cipher.svg) ![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-cipher.svg) ![Downloads](https://img.shields.io/npm/dm/sails-service-cipher.svg) ![npm version](https://img.shields.io/npm/v/sails-service-cipher.svg) ![dependencies](https://img.shields.io/david/ghaiklor/sails-service-cipher.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-cipher.svg) ![License](https://img.shields.io/npm/l/sails-service-cipher.svg)

Service for Sails framework with Cipher features.

## List of supported ciphers

- JSON Web Token

## Getting Started

Install this module.

```shell
npm install sails-service-cipher
```

Then require it in your service.

```javascript
// api/services/CipherService.js
module.exports = require('sails-service-cipher');
```

That's it, then you can create instances of cipher for your needs in your project.

```javascript
// api/controllers/SomeController.js

var jwt = CipherService.create('jwt', {
  secretKey: 'SOME_SECRET_KEY'
});

module.exports = {
  someAction: function(req, res) {
    res.ok(jwt.encodeSync('SOME_DATA_HERE'));
  }
};
```

## API

Each of Cipher instances has 4 methods:

- encode(data) - Encode your data and returns Promise
- encodeSync(data) - Encode your data in sync mode
- decode(data) - Decode your data and returns Promise
- decodeSync(data) - Decode your data in sync mode

## Examples

### JWT encode and decode

```javascript
var jwtCipher = CipherService.create('jwt', {
  secretKey: 'SECRET', // Secret key for signing token
  algorithm: 'HS512', // Algorithm for signing
  expiresInMinutes: 60 * 24 // When this token will be expired
});

jwtCipher.encode('SOME_DATA').then(console.log.bind(console)); // Encode SOME_DATA and print to console
jwtCipher.decode('SOME_JWT_TOKEN').then(console.log.bind(console)); // Decode some token and print to console
console.log(jwtCipher.encodeSync({foo: 'bar'})); // Encode object in sync mode and print to console JWT
console.log(jwtCipher.decodeSync('SOME_JWT_TOKEN')); // Decode JWT and print to console result
```

### One more usage in services

```javascript
// api/services/CipherService.js
var ciphers = require('sails-service-cipher');
var jwt = ciphers.create('jwt', {
  secretKey: 'SOME_SECRET_KEY'
});

module.exports = {
  jwt: jwt
};

// api/controllers/SomeController.js
module.exports = {
  someAction: function(req, res) {
    res.ok(CipherService.jwt.encodeSync('SOME_DATA'));
  }
};
```

## License

The MIT License (MIT)

Copyright (c) 2015 Eugene Obrezkov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
