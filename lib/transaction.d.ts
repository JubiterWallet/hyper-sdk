export declare enum TransactionType {
    "EVM" = 0,
    "HVM" = 1,
    "TRANSFER" = 2
}
export declare type BaseTransaction = {
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
};
/**
 * const tx: Transaction = {from:"from",to:"to","payload":"0x7b2264696441646472657373223a226469643a6870633a6879706572636861696e494430313a6e42534372344f4a634f4c4d4b5547644a655876222c227374617465223a3"}
 */
export declare type Transaction = BaseTransaction & {
    [key: string]: string | number | Array<string | number | Array<string | number>>;
};
