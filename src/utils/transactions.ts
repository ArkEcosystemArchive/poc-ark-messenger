import { encryptMessage, fetchRemoteNonce, broadcastTransaction } from './index';
import { Transactions } from '@arkecosystem/crypto';
import { ITransactionData, IPostTransactionResponse } from '../interfaces';
import { MessageTransaction } from '../custom-transactions/message-transaction/transactions';
import { MessageTransactionBuilder } from '../custom-transactions/message-transaction/builders';

Transactions.TransactionRegistry.registerTransactionType(MessageTransaction);

const NETWORK = Number(process.env.REACT_APP_NETWORK);

const createMessageTransaction = async (
  recipientId: string,
  encryptedMessage: string,
  passphrase: string,
  senderId: string
): Promise<ITransactionData> => {
  const nonce = await fetchRemoteNonce(senderId);

  const tx = new MessageTransactionBuilder()
    .network(NETWORK)
    .recipientId(recipientId)
    .messageData(encryptedMessage)
    .nonce(nonce)
    .sign(passphrase);

  return tx.getStruct();
};

export const sendMessage = async (
  recipientId: string,
  text: string,
  channelPassphrase: string,
  userPassphrase: string,
  userAddress: string
): Promise<IPostTransactionResponse | void> => {
  const encryptedMessage = encryptMessage(text, channelPassphrase);

  try {
    const tx = await createMessageTransaction(
      recipientId,
      encryptedMessage,
      userPassphrase,
      userAddress
    );

    return broadcastTransaction(tx);
  } catch (err) {
    console.error(err);
  }
};
