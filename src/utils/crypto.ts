const crypto = require('crypto-browserify');

export const encryptMessage = (message: string, passphrase: string): string => {
  const algorithm = process.env.REACT_APP_ENCRYPTION_ALGORITHM;
  const cipher = crypto.createCipher(algorithm, passphrase);
  let crypted = cipher.update(message, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const decryptMessage = (message: string, passphrase: string): string => {
  const algorithm = process.env.REACT_APP_ENCRYPTION_ALGORITHM;
  const decipher = crypto.createDecipher(algorithm, passphrase);
  let dec = decipher.update(message, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};
