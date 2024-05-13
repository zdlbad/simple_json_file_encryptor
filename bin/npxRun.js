#!/usr/bin/env node


const {secretManager} = require('../src/secret');

const key = process.argv[2];
const filepath = process.argv[3];

console.log(`Encrypting file ${filepath} with key provided...`);
secretManager.saveSecret(filepath, key);
console.log(`file been secreted and saved to ${filepath}_sec`);
