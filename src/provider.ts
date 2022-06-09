// import { WebSocket } from "ws";
import { EventType, HyperEvent, Listener, HyperTxEvent, HyperStatusEvent } from "./event";
import { HyperWallet } from "./wallet";
import { Transaction } from "./transaction";
import { PayloadParams } from "./contract";
import {
  METHOD_ACCOUNT_GET_SM2_ADDRESS, METHOD_ACCOUNT_GET_BALANCE,
  METHOD_TX_GET_UNSIGN_DATA, METHOD_TX_SEND,
  METHOD_CONTRACT_GET_INPUT_DATA, EVENT_SUB_TX,
  METHOD_DID_GEN_ADDRESS, METHOD_DID_GET_REGISTER_UNSIGN_DATA, METHOD_DID_SEND_REGISTER_TX
  , METHOD_DID_GET_DOCUMENT, METHOD_DID_GET_CHAIN_ID, METHOD_DID_GET_ADDRESS_STATUS
  , TX_SIGN_TYPE_DID_SM, METHOD_DID_GET_ALL_CHAIN_ID, ERROR_CONNECTION_NOT_OPEN, EVENT_SUB_STATUS
} from "./constant";
let NextId = 1;
export type InflightRequest = {
  callback: (error: any, result: any) => void;
  payload: string;
};
export type Options = {
  delay: number,
  maxAttempts: boolean | number,
};
export class HyperProvider {
  ws?: WebSocket;
  url: string;
  requests: { [name: string]: InflightRequest };
  events: { [tag: string]: HyperTxEvent | HyperEvent };
  wallet: HyperWallet;
  address: string | null;
  didAddress: { [chainId: string]: string };
  reconnectAttempts: 0;
  reconnecting: boolean;
  options?: Options
  constructor(url: string, wallet: HyperWallet, options?: Options
  ) {
    this.requests = {};
    this.events = {};
    this.url = url;
    this.wallet = wallet;
    this.address = null;
    this.didAddress = {};
    this.reconnectAttempts = 0;
    this.reconnecting = false;
    this.options = options || {
      delay: 5000,
      maxAttempts: false,
    };
  }
  open(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.ws == undefined) {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = (e: any) => {
          this.reconnecting = false;
          this.reconnectAttempts = 0;
          console.log('open successed');
          resolve(e);
        };
        this.ws.onerror = async (e: any) => {
          console.log('open failed', e);
          if (this.reconnecting || this.ws?.readyState === WebSocket.CLOSED) {
            return;
          }
          reject(e);
        };
        this.ws.onclose = async (e: any) => {
          //https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code
          // console.log('close', e.code);
          if (1000 != e.code || 1001 != e.code || e.wasClean === false) {// 1006
            this.ws = undefined;
            await this.reconnect();
            return;
          } else {
            resolve(true);
          }
        };
        this.ws.onmessage = (messageEvent: any) => {
          const data = messageEvent.data as string;
          const result = JSON.parse(data);
          if (result.id != null) {
            const id = String(result.id);
            const request = this.requests[id];
            delete this.requests[id];

            if (result.result !== undefined) {
              request.callback(null, result.result);
            } else {
              //code message
              if (result.code != 0) {
                return request.callback(undefined, { error: result });
              }
              // let error: Error | null = null;
              // if (result.error) {
              //   error = new Error(result.error.message || 'unknown error');
              // }
              // else {
              //   error = new Error('unknown error');
              // }
              request.callback(undefined, { error: { message: result.error.message || 'unknown error' } });
            }
          }
        };

      }
    });
  }
  send(method: string, params?: Array<any>): Promise<any> {
    const rid = NextId++;
    if (this.reconnecting || this.ws === undefined || this.ws?.readyState !== WebSocket.CONNECTING) {
      return new Promise((resolve) => { resolve(ERROR_CONNECTION_NOT_OPEN) });
    }
    return new Promise((resolve, reject) => {
      function callback(error: Error | null, result: any) {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }

      const payload = JSON.stringify({
        method: method,
        params: params,
        id: rid,
        namespace: 'global',
        jsonrpc: '2.0',
      });

      this.requests[String(rid)] = { callback, payload };

      if (this.ws) {
        this.ws.send(payload);
      }
    });
  }

  async getAddress(): Promise<string | any> {
    if (this.address) return this.address;
    const publicKey = this.wallet.getPublicKey();
    let address = await this.send(METHOD_ACCOUNT_GET_SM2_ADDRESS, [publicKey]);
    if (!!address?.error) {
      return address;
    }
    this.address = address;
    return this.address;
  }

  async getDIDAddress(chainId: string): Promise<string | any> {
    if (this.didAddress[chainId]) return this.didAddress[chainId];
    let publicKey = this.wallet.getPublicKey();
    let didAddress = await this.send(METHOD_DID_GEN_ADDRESS, [{ "pubKey": publicKey, "chainID": chainId }]);
    if (!!didAddress?.error) {
      return didAddress;
    }
    this.didAddress[chainId] = didAddress;
    return this.didAddress[chainId];
  }

  async registerDID(chainId: string): Promise<string | any> {
    let publicKey = this.wallet.getPublicKey();
    let unsignData = await this.send(METHOD_DID_GET_REGISTER_UNSIGN_DATA, [{ "pubKey": publicKey, "chainID": chainId }]);
    if (!!unsignData?.error) {
      return unsignData;
    }
    let signature = await this.wallet.sign(unsignData, TX_SIGN_TYPE_DID_SM);
    return this.send(METHOD_DID_SEND_REGISTER_TX, [{ "unsignData": unsignData, "signature": signature, "async": false }]);
  }

  async getDIDDocument(didAddress: string): Promise<any> {
    return this.send(METHOD_DID_GET_DOCUMENT, [didAddress]);
  }

  async getDIDStatus(didAddress: string): Promise<boolean | any> {
    let didState = await this.send(METHOD_DID_GET_ADDRESS_STATUS, [didAddress]);
    return (didState?.status === 1);
  }

  async getChainId(): Promise<string> {
    return this.send(METHOD_DID_GET_CHAIN_ID, []);
  }
  async getAllChainId(): Promise<any> {
    return this.send(METHOD_DID_GET_ALL_CHAIN_ID, []);
  }
  async getBalance(address: string[]): Promise<any> {
    return this.send(METHOD_ACCOUNT_GET_BALANCE, address);
  }

  //此接口需要组织各式各样的交易，待细化
  async buildUnsignedTx(unsignedTx: Transaction, txType?: string): Promise<string> {
    //需要调用RPC接口组织待签名交易
    if (txType) {
      return this.send(METHOD_TX_GET_UNSIGN_DATA, [unsignedTx]);
    }
    return this.send(METHOD_TX_GET_UNSIGN_DATA, [unsignedTx]);
  }

  async signTx(txRaw: string, signType?: string): Promise<string> {
    return this.wallet.sign(txRaw, signType);
  }

  async signMessage(msg: string): Promise<string> {
    return this.wallet.sign(msg, undefined);
  }

  async verifyMessage(msg: string, signature: string): Promise<boolean> {
    return this.wallet.verify(msg, signature);
  }

  async broadcastTx(tx: Transaction): Promise<string> {
    //需要调用RPC接口广播交易
    return this.send(METHOD_TX_SEND, [{ "unsignData": tx.hex, "signature": tx.signature, "async": false }]); //txid
  }

  async buildContractPayload(payload: PayloadParams): Promise<string> {
    return this.send(METHOD_CONTRACT_GET_INPUT_DATA, [payload]);
  }

  subscribe(type: EventType, tag: string, listener: Listener, once: boolean, ...args: Array<any>) {
    if (type === EVENT_SUB_TX) {
      let event = new HyperTxEvent(type, tag, listener, once, this);
      event.on(args);
      this.events[tag] = event;
    } else if (type === EVENT_SUB_STATUS) {
      let event = new HyperStatusEvent(type, tag, listener, once, this);
      event.on(args);
      this.events[tag] = event;
    }
  }

  unsubscribe(tag: string) {
    const event = this.events[tag];
    event.clear();
    delete this.events[tag];
  }

  async destroy(): Promise<void> {
    if (this.ws) {
      // Wait until we have connected before trying to disconnect
      if (this.ws.readyState === WebSocket.CONNECTING) {
        await new Promise((resolve) => {
          if (this.ws) {
            this.ws.onopen = function () {
              resolve(true);
            };

            this.ws.onerror = function () {
              resolve(false);
            };
          }
        });
      }

      // Hangup
      // See: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
      this.ws.close(1000);
    }
  }

  async reconnect(): Promise<void> {
    var _this = this;
    this.reconnecting = true;
    if (!this.options?.maxAttempts ||
      this.reconnectAttempts < this.options?.maxAttempts
    ) {
      _this.reconnectAttempts++;
      await setTimeout(async function () {
        return await _this.open();
      }, this.options?.delay);
    } else {
      this.reconnecting = false;
      return;
    }
  }

  async connected(): Promise<boolean> {
    return (this.ws != undefined && this.ws.readyState === WebSocket.CONNECTING);
  }
}