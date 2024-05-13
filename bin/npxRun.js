#!/usr/bin/env node
const {secretManager} = require('../src/secret');

const args = process.argv;
// must have key specified
const keyArg = args.find(arg => arg.includes('--key'));
if (!keyArg) throw new Error('Key must be specified by --key');
const key = keyArg.split('=')[1];
if (!key || !key.trim()) throw new Error('Key cannot be empty');

// must have filepath specified
const pathArg = args.find(arg => arg.includes('--path'));
if (!pathArg) throw new Error('Path must be specified by --path');
const filepath = pathArg.split('=')[1];
if (!filepath || !filepath.trim()) throw new Error('Path cannot be empty');

console.log(`Encrypting file ${filepath} with key provided...`);
secretManager.saveSecret(filepath, key);
console.log(`file been secreted and saved to ${filepath}_sec`);
secretManager.readSecret(filepath+'_sec', key);
