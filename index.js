// dependencies

// atob and btoa for conversion between Base64 and text
const atob = require('atob');
const btoa = require('btoa');

// AES-JS for encryption
const aesjs = require('aes-js');

// PBDKF2 for key derivation
const pbkdf2 = require('pbkdf2');

// crypto for generating random cipher IV
const crypto = require('crypto');

// encrypt text with AES-256 (CBC) using key derived from password argument
const encryptText = (text, password) => {
  // convert text to base64
  const textInBase64 = btoa(unescape(encodeURIComponent(text)));

  // add padding to text in base64 so that it is a multiple of 16 bytes long
  let textWithPadding = textInBase64;

  // if text isn't a multiple of 16 bytes, add necessary amount of "=" chars to make it so
  if (textWithPadding.length % 16 != 0) {
    textWithPadding += '='.repeat(16 - (textWithPadding.length % 16));
  }

  // convert padded text to bytes and store in variable
  const textInBytes = aesjs.utils.utf8.toBytes(textWithPadding);

  // variable for key generated from password using KDF
  const derivedKey = pbkdf2.pbkdf2Sync(password, 'salt', 1, 256 / 8, 'sha512');

  // generate random IV and store in variable
  const generatedIV = crypto.randomBytes(16);

  // AES-CBC object
  const aesCBC = new aesjs.ModeOfOperation.cbc(derivedKey, generatedIV);

  // encrypted text (in bytes) using AES-CBC, and store encrypted bytes in variable
  const encryptedTextInBytes = aesCBC.encrypt(textInBytes);

  // convert encryptedTextInBytes to Hex to print/store (and put in variable)
  const encryptedTextInHex = aesjs.utils.hex.fromBytes(encryptedTextInBytes);

  // convret generated IV to Hex and store in variable
  const generatedIVInHex = aesjs.utils.hex.fromBytes(generatedIV);

  // create cipher text string with IV and encrypted hex, separated by a ":" (which is a non-hex string)
  const cipherText = generatedIVInHex + ':' + encryptedTextInHex;

  // return cipher text, which includes IV, and encrypted text
  return cipherText;
};

// decrypt cipher text with AES-256 (CBC) using key derived from password argument
const decryptText = (cipherText, password) => {
  // variable for key generated from password using KDF
  const derivedKey = pbkdf2.pbkdf2Sync(password, 'salt', 1, 256 / 8, 'sha512');

  // split cipherText into IV and encrypted text (separated by a colon) and store in variable
  const splitCipherText = cipherText.split(':');

  // store parts of splitCipherText variable into corresponding separate variables
  const ivInHex = splitCipherText[0];
  const encryptedHex = splitCipherText[1];

  // convert IV and encrypted Hex to bytes and store in variable
  const iv = aesjs.utils.hex.toBytes(ivInHex);
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

  // AES-CBC object
  const aesCBC = new aesjs.ModeOfOperation.cbc(derivedKey, iv);

  // decrypt encrypted bytes and store in variable
  const decryptedBytes = aesCBC.decrypt(encryptedBytes);

  // convert decrypted bytes into decrypted text in base64
  let decryptedTextInBase64 = aesjs.utils.utf8.fromBytes(decryptedBytes);

  // remove padding from base64 decrypted Base64 text and store in variable
  decryptedTextInBase64 = decryptedTextInBase64.replace(/=/g, '');

  // convert decryptedTextInBase64 to text
  const decryptedText = decodeURIComponent(escape(atob(decryptedTextInBase64)));

  // return decrypted text
  return decryptedText;
};

// encrypt JSON
const encryptJSON = (obj, password) => encryptText(JSON.stringify(obj), password);

// decrypt JSON
const decryptJSON = (cipherText, password) => JSON.parse(decryptText(cipherText, password));

// export all necessary functions
module.exports = {
  encrypt: encryptText,
  decrypt: decryptText,
  encryptJSON,
  decryptJSON,
};
