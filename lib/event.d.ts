/// <reference types="node" />
import { HyperProvider } from "./provider";
export interface EventFilter {
    address?: string;
    topics?: Array<string | Array<string> | null>;
}
export declare type EventType = "tx" | "block" | "network" | "status";
export declare type Listener = (...args: Array<any>) => void;
export declare class HyperEvent {
    readonly listener: Listener;
    readonly once: boolean;
    readonly type: EventType;
    readonly tag: string;
    readonly interval: number;
    readonly provider: HyperProvider;
    _poller: NodeJS.Timer | null;
    constructor(type: EventType, tag: string, listener: Listener, once: boolean, provider: HyperProvider, interval?: number);
    on(...args: Array<any>): void;
    poll(...args: Array<any>): Promise<void>;
    emit(eventName: String, ...args: Array<any>): boolean;
    clear(): void;
}
export declare class HyperTxEvent extends HyperEvent {
    poll(...args: Array<any>): Promise<void>;
}
export declare class HyperStatusEvent extends HyperEvent {
    poll(): Promise<void>;
}
