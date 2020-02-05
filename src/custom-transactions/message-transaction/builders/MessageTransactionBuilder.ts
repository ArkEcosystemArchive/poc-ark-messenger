import { Interfaces, Transactions, Utils } from '@arkecosystem/crypto';
import { MessageTransaction } from '../transactions';

export class MessageTransactionBuilder extends Transactions.TransactionBuilder<
  MessageTransactionBuilder
> {
  constructor() {
    super();
    this.data.type = MessageTransaction.type;
    this.data.typeGroup = MessageTransaction.typeGroup;
    this.data.version = 2;
    this.data.fee = Utils.BigNumber.make('1000000');
    this.data.amount = Utils.BigNumber.ZERO;
    this.data.asset = { messageData: {} };
    this.data.recipientId = undefined;
  }

  public messageData(message: string): MessageTransactionBuilder {
    // @ts-ignore
    this.data.asset.messageData = {
      message
    };

    return this;
  }

  public getStruct(): Interfaces.ITransactionData {
    const struct: Interfaces.ITransactionData = super.getStruct();
    struct.amount = this.data.amount;
    struct.asset = this.data.asset;
    struct.recipientId = this.data.recipientId;
    return struct;
  }

  protected instance(): MessageTransactionBuilder {
    return this;
  }
}
