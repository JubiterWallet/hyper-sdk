import { EventType, HyperEvent, Listener, HyperTxEvent } from "./event";
import { HyperWallet } from "./wallet";
import { Transaction } from "./transaction";
import { PayloadParams } from "./contract";
export declare type InflightRequest = {
    callback: (error: any, result: any) => void;
    payload: string;
};
export declare type Options = {
    delay: number;
    maxAttempts: boolean | number;
};
export declare type RegisterParams = {
    name: string;
    idCardNo: string;
    mobile: string;
};
export declare type PageParams = {
    pageSize: number;
    pageNum: number;
};
export declare class HyperProvider {
    ws?: WebSocket;
    url: string;
    requests: {
        [name: string]: InflightRequest;
    };
    events: {
        [tag: string]: HyperTxEvent | HyperEvent;
    };
    wallet: HyperWallet;
    address: string | null;
    didAddress: string | null;
    reconnectAttempts: 0;
    reconnecting: boolean;
    options?: Options;
    constructor(url: string, wallet: HyperWallet, options?: Options);
    open(): Promise<any>;
    send(method: string, params?: Array<any>): Promise<any>;
    getAddress(): Promise<string | any>;
    getDIDAddress(): Promise<string | any>;
    registerDID(): Promise<Transaction | any>;
    getRegistedDIDAddress(): Promise<any>;
    getAllChainId(): Promise<any>;
    buildUnsignedTx(unsignedTx: Transaction, txType?: string): Promise<any>;
    signTx(txRaw: string, signType?: string): Promise<string>;
    signMessage(msg: string): Promise<string>;
    verifyMessage(msg: string, signature: string): Promise<boolean>;
    sendTx(tx: Transaction, contractAddress?: string): Promise<Transaction | any>;
    sendTxAsync(tx: Transaction, contractAddress?: string): Promise<Transaction | any>;
    getTxReceipt(txHash: string): Promise<any>;
    buildContractPayload(payload: PayloadParams): Promise<string>;
    preRegister(params: RegisterParams): Promise<string | any>;
    register(id: string, verifyCode: string): Promise<boolean | any>;
    checkRegister(): Promise<boolean>;
    getAssets(param: PageParams & {
        contractAddress?: string;
    }): Promise<any>;
    getAssetTransferHis(param: PageParams & {
        assetId: number;
        contractAddress: string;
    }): Promise<any>;
    subscribe(type: EventType, tag: string, listener: Listener, once: boolean, interval?: number, ...args: Array<any>): void;
    unsubscribe(tag: string): void;
    destroy(): Promise<void>;
    reconnect(): Promise<void>;
    connected(): Promise<boolean>;
    getTimestamp(): number;
}
