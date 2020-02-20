import BigNumber from 'bignumber.js';
import {
  checkAccountExists,
  getTransactions,
  getLastMessage,
  fetchUsername,
  fetchTotalMessages,
  fetchTotalUserMessages,
  fetchTotalUsers,
  fetchRemoteNonce,
  fetchBalance,
  fetchRegistrationDate
} from '../../utils';

const transactionProperties = [
  'id',
  'blockId',
  'version',
  'type',
  'typeGroup',
  'amount',
  'fee',
  'sender',
  'senderPublicKey',
  'recipient',
  'signature',
  'asset',
  'confirmations',
  'timestamp',
  'nonce'
].sort();

describe('api', () => {
  test('it should return true if the account exists', async () => {
    expect(await checkAccountExists('genesis_1')).toBe(true);
  });

  test('it should return false if the account does not exist', async () => {
    expect(await checkAccountExists('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toBe(
      false
    );
  });

  test('it should return message transactions for entered channel', async () => {
    const transactions = await getTransactions('THWdp6jgPBK5K7ZiCj1b5cVrBLC9ufPLmM');
    expect(transactions.length).toBeGreaterThanOrEqual(1);
    transactions.forEach(transaction => {
      expect(Object.keys(transaction).sort()).toEqual(
        expect.arrayContaining(transactionProperties)
      );
    });
  });

  test('it should return the last message transaction for entered channel', async () => {
    const transaction = await getLastMessage('THWdp6jgPBK5K7ZiCj1b5cVrBLC9ufPLmM');
    expect(Object.keys(transaction).sort()).toEqual(expect.arrayContaining(transactionProperties));
  });

  test('it should return the username for entered address', async () => {
    expect(await fetchUsername('TCmQEUaq3XdnXGoPHh5eXtpqJsFvwEa7gw')).toBe('genesis_1');
  });

  test('it should return null because the account does not exist', async () => {
    expect(await fetchUsername('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toBe(null);
  });

  test('it should return an amount of total messages', async () => {
    const total = await fetchTotalMessages();
    expect(typeof total).toBe('number');
  });

  test('it should return an amount of total messages of a user', async () => {
    const total = await fetchTotalUserMessages('TJSCUCpHftJhLeaTpSK3pVNdykf9Ee5gww');
    expect(typeof total).toBe('number');
  });

  test('it should return an amount of total users', async () => {
    const total = await fetchTotalUsers();
    expect(typeof total).toBe('number');
  });

  test('it should return the nonce of the entered username', async () => {
    const nonce = await fetchRemoteNonce('genesis_1');
    expect(nonce).toBe('3');
  });

  test('it should return the balance of the entered address', async () => {
    const amount = await fetchBalance('TKj5yTdwsQ7vFap8AsdUBsEpkdyEhQWArM');
    expect(amount).toMatchObject(new BigNumber('1399889870000000'));
  });

  test('it should return the registration date of the entered address as a timestamp', async () => {
    const data = await fetchRegistrationDate('TCmQEUaq3XdnXGoPHh5eXtpqJsFvwEa7gw');
    expect(data).toStrictEqual({ registeredOn: '2020-02-17T08:38:15.953Z', username: 'genesis_1' });
  });
});
