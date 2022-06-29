import { TX_OPTIONAL_FIELD_FROM, TX_OPTIONAL_FIELD_TO, TX_OPTIONAL_FIELD_TYPE, TX_OPTIONAL_FIELD_EXTRA, TX_OPTIONAL_FIELD_VALUE, TX_OPTIONAL_FIELD_PAYLOAD, TX_OPTIONAL_FIELD_OP_CODE, TX_OPTIONAL_FIELD_EXTRA_ID_64, TX_OPTIONAL_FIELD_EXTRA_ID_STRING, TX_OPTIONAL_FIELD_SIGNATURE, TX_OPTIONAL_FIELD_SIMULATE, TX_OPTIONAL_FIELD_HASH, TX_OPTIONAL_FIELD_EXTRA_ID_LONG, TX_OPTIONAL_FIELD_UNSIGN_DATA, TX_OPTIONAL_FIELD_INVALID_MSG, TX_OPTIONAL_FIELD_TIMESTAMP, TX_OPTIONAL_FIELD_CONTRACT_NAME } from "./constant";
export declare enum TransactionType {
    "EVM" = "EVM",
    "HVM" = "HVM",
    "TRANSFER" = "TRANSFER"
}
export declare type BaseTransaction = {
    [TX_OPTIONAL_FIELD_FROM]: string;
    [TX_OPTIONAL_FIELD_TO]: string;
    [TX_OPTIONAL_FIELD_VALUE]?: number;
    [TX_OPTIONAL_FIELD_TYPE]?: string;
    [TX_OPTIONAL_FIELD_TIMESTAMP]?: number;
    [TX_OPTIONAL_FIELD_PAYLOAD]?: string;
    [TX_OPTIONAL_FIELD_OP_CODE]?: number;
    [TX_OPTIONAL_FIELD_SIMULATE]?: boolean;
    [TX_OPTIONAL_FIELD_CONTRACT_NAME]?: string;
    [TX_OPTIONAL_FIELD_EXTRA]?: string;
    [TX_OPTIONAL_FIELD_EXTRA_ID_64]?: Array<number>;
    [TX_OPTIONAL_FIELD_EXTRA_ID_LONG]?: Array<number>;
    [TX_OPTIONAL_FIELD_EXTRA_ID_STRING]?: Array<string>;
    [TX_OPTIONAL_FIELD_INVALID_MSG]?: string;
    [TX_OPTIONAL_FIELD_SIGNATURE]?: string;
    [TX_OPTIONAL_FIELD_UNSIGN_DATA]?: string;
    [TX_OPTIONAL_FIELD_HASH]?: string;
};
/**
 * const tx: Transaction = {from:"from",to:"to","payload":"0x7b2264696441646472657373223a226469643a6870633a6879706572636861696e494430313a6e42534372344f4a634f4c4d4b5547644a655876222c227374617465223a3"}
 */
export declare type Transaction = BaseTransaction & {
    [key: string]: string | number | undefined | Array<string | number | Array<string | number>>;
};
/**
 * get transaction signature types
 */
export declare const SIGN_SM_TYPE_MAP: {
    DEFAULT_SM: {
        signType: string;
        prefix: string;
    };
    ACCOUNT_SM: {
        signType: string;
        prefix: string;
    };
    DID_SM: {
        signType: string;
        prefix: string;
    };
};
