// import { WebSocket } from "ws";//TODO when  test need import WebSocket
import { EventType, HyperEvent, Listener, HyperTxEvent, HyperStatusEvent } from "./event";
import { HyperWallet } from "./wallet";
import { Transaction } from "./transaction";
import { PayloadParams } from "./contract";
import {
  METHOD_ACCOUNT_GET_SM2_ADDRESS, METHOD_ACCOUNT_PRE_KYC, METHOD_ACCOUNT_KYC, METHOD_ACCOUNT_CHECK_KYC,
  METHOD_TX_GET_UNSIGN, METHOD_TX_SEND, METHOD_TX_SEND_ASYNC, METHOD_ASSET_GET_TRANSFER_HISTORY,
  METHOD_CONTRACT_GET_INPUT_DATA, EVENT_SUB_TX, METHOD_ASSET_GET_BY_DID, DEFAULT_PAGE_NUM, METHOD_DID_GET_BY_PUBKEY,
  METHOD_DID_GEN_ADDRESS, METHOD_DID_GET_REGISTER_UNSIGN, DEFAULT_PAGE_SIZE, METHOD_TX_GET_RECEIPT_BY_HASH,
  TX_SIGN_TYPE_DID_SM, METHOD_DID_GET_ALL_CHAIN_ID, ERROR_CONNECTION_NOT_OPEN, EVENT_SUB_STATUS, SECOND
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
export type RegisterParams = {
  name: string,
  idCardNo: string,
  mobile: string,
};
export type PageParams = {
  pageSize: number,
  pageNum: number
};
export class HyperProvider {
  ws?: WebSocket;
  url: string;
  requests: { [name: string]: InflightRequest };
  events: { [tag: string]: HyperTxEvent | HyperEvent };
  wallet: HyperWallet;
  address: string | null;
  didAddress: string | null;
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
    this.didAddress = null;
    this.reconnectAttempts = 0;
    this.reconnecting = false;
    this.options = options || {
      delay: 5 * SECOND,
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
          let data = messageEvent.data as string;
          // JSON.parse large numbers 
          data = data.replace(/:s*([0-9]{15,})s*(,?)/g, ': "$1" $2'); 
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
              request.callback(undefined, { error: { message: result.error.message || 'unknown error' } });
            }
          }
        };

      }
    });
  }
  send(method: string, params?: Array<any>): Promise<any> {
    const rid = NextId++;
    if (this.reconnecting || this.ws === undefined || this.ws?.readyState !== WebSocket.OPEN) {
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
    let publicKey = this.wallet.getPublicKey();
    let address = await this.send(METHOD_ACCOUNT_GET_SM2_ADDRESS, [publicKey]);
    if (!!address?.error) {
      return address;
    }
    this.address = address;
    return this.address;
  }

  async getDIDAddress(): Promise<string | any> {
    if (this.didAddress) return this.didAddress;
    let publicKey = this.wallet.getPublicKey();
    let didAddress = await this.send(METHOD_DID_GEN_ADDRESS, [publicKey]);
    if (!!didAddress?.error) {
      return didAddress;
    }
    this.didAddress = didAddress;
    return this.didAddress;
  }

  async registerDID(): Promise<Transaction | any> {
    let publicKey = this.wallet.getPublicKey();
    let unsignTx = await this.send(METHOD_DID_GET_REGISTER_UNSIGN, [publicKey]);
    if (!!unsignTx?.error) {
      return unsignTx;
    }
    let signature = await this.wallet.sign(unsignTx.unsignData, TX_SIGN_TYPE_DID_SM);
    unsignTx.signature = signature;
    let hash = await this.sendTxAsync(unsignTx);
    if (!!hash?.error) {
      return hash;
    }
    unsignTx.hash = hash;
    return unsignTx
  }

  async getRegistedDIDAddress(): Promise<string | any> {
    let publicKey = this.wallet.getPublicKey();
    return this.send(METHOD_DID_GET_BY_PUBKEY, [publicKey]);
  }

  async getAllChainId(): Promise<any> {
    return this.send(METHOD_DID_GET_ALL_CHAIN_ID, []);
  }

  async buildUnsignedTx(unsignedTx: Transaction, txType?: string): Promise<any> {
    if (txType) {
      return this.send(METHOD_TX_GET_UNSIGN, [unsignedTx]);
    }
    return this.send(METHOD_TX_GET_UNSIGN, [unsignedTx]);
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

  async sendTx(tx: Transaction, contractAddress?: string): Promise<Transaction | any> {
    return this.send(METHOD_TX_SEND, [{ "txJson": tx, "contractAddress": contractAddress || "", "async": false }]);
  }

  async sendTxAsync(tx: Transaction, contractAddress?: string): Promise<Transaction | any> {
    return this.send(METHOD_TX_SEND_ASYNC, [{ "txJson": tx, "contractAddress": contractAddress || "", "async": false }]);
  }

  async getTxReceipt(txHash: string): Promise<any> {
    return this.send(METHOD_TX_GET_RECEIPT_BY_HASH, [txHash]);
  }

  async buildContractPayload(payload: PayloadParams): Promise<string> {
    return this.send(METHOD_CONTRACT_GET_INPUT_DATA, [payload]);
  }

  async preRegister(params: RegisterParams): Promise<string | any> {
    let { name, idCardNo, mobile } = params;
    let publicKey = this.wallet.getPublicKey();
    let didAddress = await this.getDIDAddress();
    let timestamp = this.getTimestamp();
    let summary = (didAddress + "|" + name + "|" + idCardNo + "|" + mobile + "|" + timestamp);
    let identitySign = await this.signMessage(Buffer.from(summary, "utf8").toString("hex"));
    return this.send(METHOD_ACCOUNT_PRE_KYC, [{ "address": didAddress, "publicKey": publicKey, "name": name, "idCardNo": idCardNo, "mobile": mobile, "timestamp": timestamp, "identitySign": identitySign }]);
  }

  async register(id: string, verifyCode: number): Promise<boolean | any> {
    return this.send(METHOD_ACCOUNT_KYC, [{ "id": id, "verifyCode": verifyCode }]);
  }

  async checkRegister(): Promise<boolean> {
    let publicKey = this.wallet.getPublicKey();
    return this.send(METHOD_ACCOUNT_CHECK_KYC, [publicKey]);
  }

  async getAassets(param: PageParams & { contractAddress?: string }): Promise<any> {
    let didAddress = await this.getDIDAddress();
    return this.send(METHOD_ASSET_GET_BY_DID, [{
      did: didAddress,
      contractAddress: param.contractAddress,
      pageSize: param.pageSize || DEFAULT_PAGE_SIZE,
      pageNum: param.pageNum || DEFAULT_PAGE_NUM
    }]);
  }

  async getAassetTransferHis(param: PageParams & { assetId: number, contractAddress: string }): Promise<any> {
    return this.send(METHOD_ASSET_GET_TRANSFER_HISTORY, [{
      assetId: param.assetId,
      contractAddress: param.contractAddress,
      pageSize: param.pageSize || DEFAULT_PAGE_SIZE,
      pageNum: param.pageNum || DEFAULT_PAGE_NUM
    }]);
  }

  subscribe(type: EventType, tag: string, listener: Listener, once: boolean, interval?: number, ...args: Array<any>) {
    if (type === EVENT_SUB_TX) {
      let event = new HyperTxEvent(type, tag, listener, once, this, interval);
      event.on(args);
      this.events[tag] = event;
    } else if (type === EVENT_SUB_STATUS) {
      let event = new HyperStatusEvent(type, tag, listener, once, this, interval);
      event.on(args);
      this.events[tag] = event;
    }
  }

  unsubscribe(tag: string) {
    const event = this.events[tag];
    if (event) {
      event.clear();
      delete this.events[tag];
    }
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
    return (this.ws != undefined && this.ws.readyState === WebSocket.OPEN);
  }
  getTimestamp(): number {
    return new Date().getTime();
  }
}