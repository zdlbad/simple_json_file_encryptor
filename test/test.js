const {secretManager} = require('../src/secret');

const key = 'someSecureKey';
secretManager.saveSecret(__dirname + '/config.json', key);
const contentRestored = secretManager.readSecret(__dirname + '/config.json_sec', key);
console.log(contentRestored);


