const fs = require('fs');
const crypto = require('crypto');

const secretManager = {

  encryptContent (content, key) {
    const encryptObj = crypto.createCipheriv('aes-256-cbc', key, Buffer.from(key).subarray(0,16));
    let result = encryptObj.update(content, 'utf8', 'hex');
    result += encryptObj.final('hex');
    return result;
  },

  decryptContent (encryptedContent, key) {
    const decryptObj = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(key).subarray(0,16));
    let result = decryptObj.update(encryptedContent, 'hex', 'utf8');
    result += decryptObj.final('utf8');
    return result;
  },

  // read content from filepath
  readSecret (filepath, key) {
    key = key.padStart(32, '0');
    key = Buffer.from(key).subarray(0, 32);
    const filecontentBuffer = fs.readFileSync(filepath);
    const filecontent = filecontentBuffer.toString('utf-8'); 
    
    // convert to json format
    return JSON.parse(this.decryptContent(filecontent, key));
  },
  
  // load content from filepath
  saveSecret (filepath, key) {
    key = key.padStart(32, '0')
    key = Buffer.from(key).subarray(0, 32);
    const filecontent = fs.readFileSync(filepath);

    // hash content
    const crypted = this.encryptContent(filecontent, key);

    // save to new file
    fs.writeFileSync(filepath + '_sec', crypted);

    return crypted;
  }
} 

module.exports = {
  secretManager
}