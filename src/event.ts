import { HyperProvider } from "./provider";
import { METHOD_TX_GET_TX_BY_HASH, EVENT_SUB_BLOCK, EVENT_SUB_TX, EVENT_SUB_ADDRESS, EVENT_SUB_NETWORK, METHOD_BLOCK_GET_LATEST_BLOCK } from "./constant";

export interface EventFilter {
  address?: string;
  topics?: Array<string | Array<string> | null>;
}
export type EventType = "tx" | "block" | "network";

export type Listener = (...args: Array<any>) => void;

//这应该是一个abstract类
export class HyperEvent {
  readonly listener: Listener;
  readonly once: boolean;
  readonly type: EventType;
  readonly tag: string;
  readonly interval: number;
  readonly provider: HyperProvider;
  _poller: NodeJS.Timer | null;
  constructor(type: EventType, tag: string, listener: Listener, once: boolean, provider: HyperProvider) {
    this.listener = listener;
    this.tag = tag;
    this.once = once;
    this.type = type;
    this.interval = 1000;
    this._poller = null;
    this.provider = provider;
  }

  on(...args: Array<any>): void {
    this._poller = setInterval(() => {
      this.poll(args);
    }, this.interval);
  }
  //子类需要重写这个函数
  async poll(...args: Array<any>): Promise<void> {
    //do something
    this.emit(this.tag, args[0]);
    if (this.once) {
      if (this._poller) {
        clearInterval(this._poller);
      }
    }
  }

  emit(eventName: String, ...args: Array<any>): boolean {
    this.listener.apply(eventName, args);
    return true;
  }

  clear(): void {
    if (this._poller) {
      clearInterval(this._poller);
    }
  }
}


export class HyperTxEvent extends HyperEvent {
  async poll(...args: Array<any>): Promise<void> {
    //需要调rpc接口具体实现
    if (this.type == EVENT_SUB_TX) {
      let tx = await this.provider.send(METHOD_TX_GET_TX_BY_HASH, args[0])
      //TODO transactin 状态判断
      if(tx.blockHash){

      }
      this.emit(this.tag, [tx]);
      if (this.once) {
        if (this._poller) {
          clearInterval(this._poller);
          this._poller = null;
        }
      }
    }
  }
}