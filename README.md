<h1 align="center">🔐 encrypt-with-password</h1>
<blockquote align="center">Securely encrypt text with a password in JavaScript.</blockquote>
<p align="center">
    <a href="https://github.com/xtrp/encrypt-with-password/"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/xtrp/encrypt-with-password"></a>
    <a href="https://github.com/xtrp/encrypt-with-password/"><img alt="GitHub stars" src="https://img.shields.io/github/stars/xtrp/encrypt-with-password?style=social"></a>
    <a href="https://github.com/xtrp"><img alt="GitHub followers" src="https://img.shields.io/github/followers/xtrp?label=Follow%20Fred%20Adams&style=social"></a>
    <a href="https://www.npmjs.com/package/encrypt-with-password/"><img alt="NPM Downloads" src="https://img.shields.io/npm/dw/encrypt-with-password"></a>
    <img alt="Build Status" src="https://travis-ci.com/xtrp/encrypt-with-password.svg?token=QZcgzzn9v2iTArb6wSyC&branch=master">
</p>

encrypt-with-password simplifies encrypting text and data securely with leading security standards. It uses [PBKDF2](https://www.npmjs.com/package/pbkdf2) for key derivation and [AES](https://www.npmjs.com/package/aes-js) 256-bit for encryption and decryption.

## Download

encrypt-with-password can be downloaded from NPM with the command:

```
npm install encrypt-with-password
```

or:

```
yarn add encrypt-with-password
```

## Encrypting and Decrypting Text with a Password

`encryptpwd.encrypt(text, password)` for encrypting text with a password.

`encryptpwd.decrypt(encryptedValue, password)` for decrypting text with the password used when encrypting.

Example:

```javascript
const encryptpwd = require('encrypt-with-password');

const text = 'Hello, World!';
const password = 'examplepassword';

const encrypted = encryptpwd.encrypt(text, password); // ---> this is the encrypted (output) value

// example encrypted value: 'e68e7ccd9e908665818a49f111c342ed:c9b83ff7624bb3b26af8cc853d61cd2f7959cecc4308383c39a0924e90637889'

const decrypted = encryptpwd.decrypt(encrypted, password) // ---> this decrypts the encrypted value and yields the original text
```

NOTE: the encrypted output value of given text and password will likely change when encrypting multiple times with the same text and password. This is because of the nature of AES, block ciphers, and randomized IVs (initialization vectors).

## Encrypting and Decrypting JavaScript Objects (JSON) with a Password

`encryptpwd.encryptJSON(jsObject, password)` for encrypting JavaScript objects and variables with a password.

`encryptpwd.decryptJSON(encryptedValue, password)` for decrypting JavaScript objects with the password used when encrypting.

Example:

```javascript
const encryptpwd = require('encrypt-with-password');

const jsObject = {
  aString: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  aNumber: 5,
  anArray: [1, 2, 3, 4, 5],
  anObj: {
    aKey: 'a value'
  }
};
const password = 'examplepassword2';

const encrypted = encryptpwd.encryptJSON(jsObject, password); // ---> this is the encrypted value

// example encrypted value: 'f953284ffe3e44a7b9de8487b50c3449:123378b5c481399488f520ebb774b076b85a12bc0f9a67cf8faf359eb4f804fc0594bc42374a20b4216b1312d7a408cf94517e19dfcada5513c49f6d13d26c982c562904306900a3f777b9c19b9c002e12dd216984f68566684f9f0259a45e007a0cecb2325333faafb18ed0e751933d8b1195b02b2adda29269cf1c6fa6fff73f0bac4abcf58b391521e0382c06a5f01f31c1243d827f8c7076f81d7f530259a3ae459e524bee80230672f153ab6a4e'

const decrypted = encryptpwd.decryptJSON(encrypted, password) // ---> this decrypts the encrypted value and yields the original object
```

NOTE: encrypted objects are stored in JSON. This means that some richer objects like Date and custom classes may not be supported as seemlessly as normal numbers and strings.

## Tests

Run ```npm run test``` to run tests. To see test coverage along with running tests, run ```npm run test-with-coverage```.

## Third Party Software Used

 - AES-JS for AES and encryption
 - PBKDF2 for PBKDF2 and key derivation
 - Mocha and Chai for testing and assertion
 - NYC for test coverage

## File Structure

 - `test/` &mdash; includes tests and test directories that are run with `npm run test`.
 - `index.js` &mdash; the main code for the package.
 - `img` &mdash; any images used in the README or the package.

## License and Credits

encrypt-with-password was built solely by web developer and student [Fred Adams](https://xtrp.io/).

The code is completely OSS and is MIT Licensed. See LICENSE.txt for details.