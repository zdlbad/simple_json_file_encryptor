#!/usr/bin/env node
const {secretManager} = require('../src/secret');

const args = process.argv;
// must have key specified
const keyArgIndex = args.indexOf('--key');
if (keyArgIndex < 0) throw new Error('Key must be specified by and after --key');
const key = args[keyArgIndex+1];
if (!key || !key.trim() || key.includes('--')) throw new Error('Key cannot be empty');

// must have filepath specified
const pathArgIndex = args.indexOf('--path');
if (!pathArgIndex) throw new Error('Path must be specified by and after --path');
const filepath = args[pathArgIndex+1];
if (!filepath || !filepath.trim() || filepath.includes('--')) throw new Error('Path cannot be empty');

console.log(`Encrypting file ${filepath} with key provided...`);
secretManager.saveSecret(filepath, key);
console.log(`file been secreted and saved to ${filepath}_sec`);
secretManager.readSecret(filepath+'_sec', key);
