const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    return this.process(message, key, true);
  }

  decrypt(message, key) {
    return this.process(message, key, false);
  }

  process(message, key, isEncrypt) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    message = message.toUpperCase();
    key = key.toUpperCase();
    let result = "";
    let keyIndex = 0;

    for (let char of message) {
      if (alphabet.includes(char)) {
        const charIndex = alphabet.indexOf(char);
        const shift = alphabet.indexOf(key[keyIndex % key.length]);
        const newIndex = isEncrypt
          ? (charIndex + shift) % alphabet.length
          : (charIndex - shift + alphabet.length) % alphabet.length;
        result += alphabet[newIndex];
        keyIndex++;
      } else {
        result += char;
      }
    }
    return this.isDirect ? result : result.split("").reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine
};
