import { WebSocket } from "ws";
import { EventType, HyperEvent, Listener, HyperTxEvent } from "./event";
import { HyperWallet } from "./wallet";
import { Transaction } from "./transaction";
import { PayloadParams } from "./contract";
export declare type InflightRequest = {
    callback: (error: any, result: any) => void;
    payload: string;
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
    constructor(url: string, wallet: HyperWallet);
    open(): Promise<any>;
    send(method: string, params?: Array<any>): Promise<any>;
    getAddress(): Promise<string>;
    getDIDAddress(): Promise<string>;
    registerDID(): Promise<string>;
    getDIDDocument(didAddress: string): Promise<string>;
    getChainId(): Promise<string>;
    getBalance(address: string[]): Promise<any>;
    buildUnsignedTx(unsignedTx: Transaction, txType?: string): Promise<string>;
    signTx(txRaw: string): Promise<string>;
    signMessage(msg: string): Promise<string>;
    verifyMessage(msg: string, signature: string): Promise<boolean>;
    broadcastTx(tx: Transaction): Promise<string>;
    buildContractPayload(payload: PayloadParams): Promise<string>;
    subscribe(type: EventType, tag: string, listener: Listener, once: boolean, ...args: Array<any>): void;
    unsubscribe(tag: string): void;
    destroy(): Promise<void>;
}
