import config from '../config';

const crypto = require('crypto-browserify');

export const encryptMessage = (message: string, passphrase: string): string => {
  const cipher = crypto.createCipher(config.algorithm, passphrase);
  let crypted = cipher.update(message, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const decryptMessage = (message: string, passphrase: string): string => {
  const decipher = crypto.createDecipher(config.algorithm, passphrase);
  let dec = decipher.update(message, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};
