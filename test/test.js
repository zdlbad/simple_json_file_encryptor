const fs = require('fs');
const assert = require('assert');
const {fileEncryptor} = require('../src/fileEncryptor');

const key = 'someSecureKey';
const savedFilepath = fileEncryptor.encryptFile(__dirname + '/config.json', key);
console.log(`File encrptyed and saved to file: ${savedFilepath} `);

const contentDecrypted = fileEncryptor.decryptFile(savedFilepath, key);
console.log('content restored from file', contentDecrypted);

const originalContent = JSON.parse(fs.readFileSync(__dirname + '/config.json').toString('utf-8'));

assert.deepEqual(contentDecrypted, originalContent);
console.log('Test passed! ');
