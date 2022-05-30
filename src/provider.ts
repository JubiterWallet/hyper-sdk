// import { WebSocket } from "ws";
import { EventType, HyperEvent, Listener, HyperTxEvent } from "./event";
import { HyperWallet } from "./wallet";
import { Transaction } from "./transaction";
import { PayloadParams } from "./contract";
import {
  METHOD_ACCOUNT_GET_SM2_ADDRESS, METHOD_ACCOUNT_GET_BALANCE, METHOD_TX_GET_UNSIGN_DATA, METHOD_TX_SEND,
  METHOD_CONTRACT_GET_INPUT_DATA, EVENT_SUB_TX, METHOD_DID_GEN_ADDRESS, METHOD_DID_GET_REGISTER_UNSIGN_DATA, METHOD_DID_SEND_REGISTER_TX
  , METHOD_DID_GET_DOCUMENT, METHOD_DID_GET_CHAIN_ID, METHOD_DID_GET_ADDRESS_STATUS
} from "./constant";
let NextId = 1;
export type InflightRequest = {
  callback: (error: any, result: any) => void;
  payload: string;
};

export class HyperProvider {
  ws?: WebSocket;
  url: string;
  requests: { [name: string]: InflightRequest };
  events: { [tag: string]: HyperTxEvent | HyperEvent };
  wallet: HyperWallet;
  address: string | null;
  didAddress: string | null;
  constructor(url: string, wallet: HyperWallet) {
    this.requests = {};
    this.events = {};
    this.url = url;
    this.wallet = wallet;
    this.address = null;
    this.didAddress = null;
  }
  open(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.ws == undefined) {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = (e: any) => {
          console.log('open successed');
          resolve(e);
        };
        this.ws.onerror = (e: any) => {
          console.log('open failed');
          reject(e);
        };
        this.ws.onclose = (e: any) => {
          // console.log('close');
          reject(e);
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
              request.callback(undefined, { error: result.error.message || 'unknown error' });
            }
          }
        };
      }
    });
  }
  send(method: string, params?: Array<any>): Promise<any> {
    const rid = NextId++;

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

  async getAddress(): Promise<string> {
    if (this.address) return this.address;
    const publicKey = this.wallet.getPublicKey();
    this.address = await (this.send(METHOD_ACCOUNT_GET_SM2_ADDRESS, [publicKey]) as Promise<string>);
    return this.address
  }

  async getDIDAddress(): Promise<string> {
    if (this.didAddress) return this.didAddress;
    let publicKey = this.wallet.getPublicKey();
    let didAddress = await (this.send(METHOD_DID_GEN_ADDRESS, [publicKey]) as Promise<string>);
    this.didAddress = didAddress;
    return this.didAddress;
  }

  async registerDID(): Promise<string> {
    let publicKey = this.wallet.getPublicKey();
    let unsignData = await (this.send(METHOD_DID_GET_REGISTER_UNSIGN_DATA, [publicKey]) as Promise<string>);
    console.log("registerDID unsignData-------------->",unsignData);
    let signature = await this.wallet.sign(unsignData);
    console.log("registerDID signature-------------->",signature);
   return this.send(METHOD_DID_SEND_REGISTER_TX, [{ "unsignData": unsignData, "signature": signature, "async": false }]);
  }

  async getDIDDocument(didAddress: string): Promise<any> {
    return this.send(METHOD_DID_GET_DOCUMENT, [didAddress]);
  }

  async getDIDStatus(didAddress: string): Promise<boolean> {
    let didState = await this.send(METHOD_DID_GET_ADDRESS_STATUS, [didAddress]);
    return (didState?.state == 1);
  }

  async getChainId(): Promise<string> {
    return this.send(METHOD_DID_GET_CHAIN_ID, []);
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

  async signTx(txRaw: string): Promise<string> {
    return this.wallet.sign(txRaw);
  }

  async signMessage(msg: string): Promise<string> {
    return this.wallet.sign(msg);
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
}