const fs = require('fs');
const crypto = require('crypto');

const fileEncryptor = {

  _getKey (keyString, length) {
    let adjustedKey = keyString.padStart(length, '0');
    return Buffer.from(adjustedKey).subarray(0, length);
  },

  _encryptContent (content, keyString) {
    let key = this._getKey(keyString, 32);
    let iv = this._getKey(keyString, 16);
    let encryptObj;
    try {encryptObj = crypto.createCipheriv('aes-256-cbc', key, iv)}
    catch (error) {throw new Error(`Failed to create encrypt obj, error: ${error.message}`)}
    
    try {
      let result = encryptObj.update(content, 'utf8', 'hex');
      result += encryptObj.final('hex');
      return result;
    }
    catch (error) {throw new Error(`Failed to encrypt content, error: ${error.message}`)}
  },
  
  _decryptContent (encryptedContent, keyString) {
    let key = this._getKey(keyString, 32);
    let iv = this._getKey(keyString, 16);
    let decryptObj;
    try {decryptObj = crypto.createDecipheriv('aes-256-cbc', key, iv);}
    catch (error) {throw new Error(`Failed to create encrypt obj, error: ${error.message}`)}
    
    try {
      let result = decryptObj.update(encryptedContent, 'hex', 'utf8');
      result += decryptObj.final('utf8');
      return result;
    }
    catch (error) {throw new Error(`Failed to decrypt content, error: ${error.message}`)}
  },

  // load content from filepath
  encryptFile (filepath, keyInString) {
    const filecontent = fs.readFileSync(filepath);
    try {JSON.parse(filecontent.toString('utf-8'))} catch (error) {throw new Error(`File content must be in JSON format. error: ${error.message}`);} 

    // hash content
    const encryptedContent = this._encryptContent(filecontent, keyInString);

    // save to new file
    try {fs.writeFileSync(filepath + '.crpt', encryptedContent); return filepath + '.crpt';}
    catch(error) {throw new Error(`Failed to save encrypted content to path, error: ${error.message}`)}

  },

  // read content from filepath
  decryptFile (filepath, keyInString) {
    const filecontentBuffer = fs.readFileSync(filepath);
    const filecontent = filecontentBuffer.toString('utf-8'); 
    
    // convert to json format
    const decrypted = this._decryptContent(filecontent, keyInString);
    try { return JSON.parse(decrypted);}
    catch(error) {throw new Error(`Decrypted content can not be converted to json format.`)}
  }
  
} 

module.exports = {
  fileEncryptor
}