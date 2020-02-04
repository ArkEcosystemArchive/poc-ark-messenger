// tslint:disable:max-classes-per-file
import { Errors } from "@arkecosystem/core-transactions";

export class MessageTransactionAssetError extends Errors.TransactionError {
    constructor() {
        super(`Incomplete message asset.`);
    }
}
