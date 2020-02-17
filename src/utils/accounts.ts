import {
  broadcastTransaction,
  checkAccountExists,
  getUsername,
  setUsername,
  fetchUsername,
  fetchRemoteNonce,
  fetchBalance,
  fetchRegistrationDate,
  fetchTotalUserMessages
} from './index';
import { generateMnemonic } from 'bip39';
import { Transactions, Identities } from '@arkecosystem/crypto';
import { IUser, IPostTransactionResponse, IUserInfo } from '../interfaces';

const NETWORK = Number(process.env.REACT_APP_NETWORK);

const delay = (duration: number): Promise<Number> =>
  new Promise(resolve => setTimeout(resolve, duration));

export const getAccountDataFromPassphrase = (passphrase: string): IUser => {
  const address = Identities.Address.fromPassphrase(passphrase, NETWORK);
  const publicKey = Identities.PublicKey.fromPassphrase(passphrase);

  return { username: null, passphrase, address, publicKey };
};

export const generateRandomAccount = (): IUser => {
  const passphrase = generateMnemonic();
  return getAccountDataFromPassphrase(passphrase);
};

export const getAddress = (passphrase: string): string =>
  Identities.Address.fromPassphrase(passphrase, NETWORK);

const fundAccount = async (
  address: string,
  nonceOverride?: number
): Promise<IPostTransactionResponse | void> => {
  const nonce = nonceOverride
    ? String(nonceOverride)
    : await fetchRemoteNonce(process.env.REACT_APP_ADDRESS!);

  const tx = Transactions.BuilderFactory.transfer()
    .network(NETWORK)
    .amount('5000000000')
    .recipientId(address)
    .vendorField('Account pre-load')
    .nonce(nonce)
    .sign(process.env.REACT_APP_PASSPHRASE!);

  return broadcastTransaction(tx.getStruct());
};

const registerDelegate = async (
  username: string,
  passphrase: string,
  nonceOverride?: number
): Promise<IPostTransactionResponse> => {
  const nonce = nonceOverride ? String(nonceOverride) : await fetchRemoteNonce(username);

  const tx = Transactions.BuilderFactory.delegateRegistration()
    .network(NETWORK)
    .usernameAsset(username)
    .nonce(nonce)
    .sign(passphrase);

  return broadcastTransaction(tx.getStruct());
};

export const newAccount = async (username: string): Promise<IUser> => {
  const { passphrase, address, publicKey } = generateRandomAccount();
  const blockTime = Number(process.env.REACT_APP_BLOCK_TIME!);

  await fundAccount(address);

  // Wait for at least one block (+1 sec) to have balance saved
  await delay(blockTime * 1000 + 1000);

  return registerDelegate(username, passphrase).then(() => {
    return {
      username,
      address,
      publicKey,
      passphrase
    };
  });
};

export const validateAccount = async (passphrase: string): Promise<boolean> => {
  const address = Identities.Address.fromPassphrase(passphrase, NETWORK);
  return checkAccountExists(address);
};

export const retrieveUsername = async (address: string): Promise<string> => {
  const storedUsername = getUsername(address);

  if (storedUsername) {
    return storedUsername;
  }

  const username = await fetchUsername(address);

  if (username) {
    setUsername(address, username);
    return username;
  }

  return 'Unknown';
};

export const getUserInfo = async (address: string): Promise<IUserInfo> => {
  const { username, registeredOn } = await fetchRegistrationDate(address);
  const balance = await fetchBalance(address);
  const totalMessages = await fetchTotalUserMessages(address);

  return { username, balance, registeredOn, totalMessages };
};
