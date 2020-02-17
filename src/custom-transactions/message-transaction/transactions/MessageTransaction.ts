import ByteBuffer from 'bytebuffer';
import { Transactions, Utils, Identities } from '@arkecosystem/crypto';
import { IMessageData } from '../interfaces';

const { schemas } = Transactions;

const MESSAGE_TYPE = 101;
const MESSAGE_TYPE_GROUP = 1001;

export class MessageTransaction extends Transactions.Transaction {
  public static typeGroup: number = MESSAGE_TYPE_GROUP;
  public static type: number = MESSAGE_TYPE;
  public static key: string = 'message';

  public static getSchema(): Transactions.schemas.TransactionSchema {
    return schemas.extend(schemas.transactionBaseSchema, {
      $id: 'messageData',
      required: ['asset', 'typeGroup', 'recipientId'],
      properties: {
        type: { transactionType: MESSAGE_TYPE },
        typeGroup: { const: MESSAGE_TYPE_GROUP },
        amount: { bignumber: { minimum: 0, maximum: 0 } },
        recipientId: { $ref: 'address' },
        asset: {
          type: 'object',
          required: ['messageData'],
          properties: {
            messageData: {
              type: 'object',
              required: ['message'],
              properties: {
                message: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 1024
                }
              }
            }
          }
        }
      }
    });
  }

  protected static defaultStaticFee: Utils.BigNumber = Utils.BigNumber.make('1000000');

  public serialize(options?: any): ByteBuffer {
    const { data } = this;
    const messageData = data.asset!.messageData as IMessageData;

    const messageBytes = Buffer.from(messageData.message, 'utf8');

    const buffer = new ByteBuffer(messageBytes.length + 2, true);

    buffer.writeUint16(messageBytes.length);
    buffer.append(messageBytes, 'hex');

    const { addressBuffer, addressError } = Identities.Address.toBuffer(data.recipientId!);
    options.addressError = addressError;

    buffer.append(addressBuffer);

    return buffer;
  }

  public deserialize(buf: ByteBuffer): void {
    const { data } = this;
    const messageData = {} as IMessageData;

    const messageLength = buf.readUint16();
    messageData.message = buf.readString(messageLength);
    data.recipientId = Identities.Address.fromBuffer(buf.readBytes(21).toBuffer());

    data.asset = {
      messageData
    };
  }
}
