const {fileEncryptor} = require('../src/fileEncryptor');

const key = 'someSecureKey';
const savedFilepath = fileEncryptor.encryptFile(__dirname + '/config.json', key);
console.log(`File encrptyed and saved to file: ${savedFilepath} `);

const contentDecrypted = fileEncryptor.decryptFile(__dirname + '/config.json', key);
console.log('content restored from file', contentDecrypted);


