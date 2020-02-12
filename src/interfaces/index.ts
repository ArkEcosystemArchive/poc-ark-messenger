import BigNumber from 'bignumber.js';

export interface ITransaction {
  id: string;
  blockId: string;
  version?: number;
  type: number;
  typeGroup: number;
  amount: string;
  fee: string;
  sender: string;
  senderPublicKey: string;
  recipient: string;
  signature: string;
  vendorField: string;
  confirmations: number;
  timestamp: ITimestamp;
  signatures?: string[];
  price?: number | null;
  nonce?: any;
  lockStatus?: number;
}

export interface ITransactionData {
  version?: number;
  network?: number;
  typeGroup?: number;
  type: number;
  timestamp: number;
  nonce?: any;
  senderPublicKey: string;
  fee: any;
  amount: any;
  expiration?: number;
  recipientId?: string;
  vendorField?: string;
  id?: string;
  signature?: string;
  secondSignature?: string;
  signSignature?: string;
  signatures?: string[];
  blockId?: string;
  sequence?: number;
}

export interface IMessageTransaction extends ITransaction {
  asset: { messageData: { message: string } };
}

export interface ITimestamp {
  unix: number;
  epoch: number;
  human: string;
}

export interface IMeta {
  count: number;
  pageCount: number;
  totalCount: number;
  next: string;
  previous: string;
  self: string;
  first: string;
  last: string;
}

export interface IApiTransactionsWrapper {
  data: ITransaction[];
  meta: IMeta;
}

export interface IPostTransactionResponse {
  data: {
    accept: string[];
    broadcast: string[];
    excess: string[];
    invalid: string[];
  };
}

export interface IAccount {
  address: string;
  passphrase: string;
  publicKey: string;
}

export interface IUser extends IAccount {
  username: string | null;
}

export interface IUserInfo {
  username: string;
  balance: BigNumber;
  registeredOn: string;
  totalMessages: number;
}

export interface IContext {
  user: IUser;
  update: React.Dispatch<React.SetStateAction<IUser | null>>;
  toggled: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMessage {
  id: string;
  message: string;
  sender: string;
  timestamp: string;
}

export interface IChannel {
  id: string;
  passphrase: string;
  alias: string | null;
}
