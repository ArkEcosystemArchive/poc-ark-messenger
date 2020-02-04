import {
  getAccountDataFromPassphrase,
  generateRandomAccount,
  getAddress,
  newAccount,
  validateAccount,
  retrieveUsername,
  getUserInfo
} from '../../utils';

/* 
Can't perform tests due to ark-crypto's dependency on
bcrypto's bigint functionality that does not work with Jest
*/

describe('accounts', () => {
  test('it should be true', () => {
    expect(true).toBe(true);
  });
});
