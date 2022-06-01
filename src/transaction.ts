import {
    TX_SIGN_TYPE_DID_SM,
    TX_SIGN_TYPE_ACCOUNT_SM,
} from "./constant";
//tansaction type 
export enum TransactionType {
    "EVM", "HVM", "TRANSFER"
}
// base tansaction
export type BaseTransaction = {
    from: string;
    to: string;
    hash?: string;
    type?: string;
    timestamp?: number;
    value?: number;
    payload?: string;
    opCode?: number;
    simulate?: boolean;
    contractName?: string;
    extra?: string;
    extraIdInt64?: Array<number>;
    extraIdLong?: Array<number>;
    extraIdString?: Array<string>;
    hex?: string;
    signature?: string;
    invalidMsg?: string;
};
/**
 * const tx: Transaction = {from:"from",to:"to","payload":"0x7b2264696441646472657373223a226469643a6870633a6879706572636861696e494430313a6e42534372344f4a634f4c4d4b5547644a655876222c227374617465223a3"}
 */
export type Transaction = BaseTransaction & { [key: string]: string | number | undefined | Array<string | number | Array<string | number>> };
// get transaction signature types (signature prefix)
export function getTxSignatureType(): string[] {
    return [TX_SIGN_TYPE_DID_SM, TX_SIGN_TYPE_ACCOUNT_SM];
}