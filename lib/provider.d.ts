import { WebSocket } from "ws";
import { EventType, HyperEvent, Listener } from "./event";
import { HyperWallet } from "./wallet";
export declare type InflightRequest = {
    callback: (error: Error | null, result: any) => void;
    payload: string;
};
export declare class HyperProvider {
    ws?: WebSocket;
    url: string;
    requests: {
        [name: string]: InflightRequest;
    };
    events: {
        [tag: string]: HyperEvent;
    };
    wallet: HyperWallet;
    address: string | null;
    constructor(url: string, wallet: HyperWallet);
    open(): Promise<any>;
    send(method: string, params?: Array<any>): Promise<any>;
    getAddress(): Promise<string>;
    getBalance(address: string[]): Promise<any>;
    buildUnsignedTx(): Promise<string>;
    signTx(msg: string): Promise<string>;
    broadcastTx(raw: string): Promise<string>;
    subscribe(type: EventType, tag: string, listener: Listener, once: boolean, ...args: Array<any>): void;
    unsubscribe(tag: string): void;
    destroy(): Promise<void>;
}
