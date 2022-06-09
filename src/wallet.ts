import { SM2, computeZDigest } from "gm-ts";
import { ec } from 'elliptic';
import { mnemonicToSeedSync, generateMnemonic } from 'bip39';
import {
  TX_SIGN_TYPE_DID_SM,
  TX_SIGN_TYPE_ACCOUNT_SM, TX_SIGN_TYPE_DID_SM_PREFIX,
  TX_SIGN_TYPE_ACCOUNT_SM_PREFIX
} from "./constant";
export class HyperWallet {
  keyPair: ec.KeyPair;
  sm2: SM2;
  constructor(privateKey: string) {
    this.sm2 = new SM2();
    this.keyPair = this.sm2.keyFromPrivate(privateKey, "hex");
  }

  sign(msg: string, signType?: string) {
    let r = this.computeZDigest(msg);
    const sig = this.sm2.sign(r, this.keyPair);
    return this.fromateSignature(sig.toDER("hex"), signType);
  }

  verify(msg: string, signature: string): boolean {
    let r = this.computeZDigest(msg);
    return this.sm2.verify(r, Buffer.from(signature, "hex"), this.keyPair);
  }

  getPublicKey(): string {
    return this.keyPair.getPublic("hex").toString();
  }

  fromateSignature(signature: string, signType?: string): string {
    if (!signType) {
      return signature;
    }
    let prefix;
    if (signType === TX_SIGN_TYPE_DID_SM) {
      prefix = TX_SIGN_TYPE_DID_SM_PREFIX;
    } else if (signType === TX_SIGN_TYPE_ACCOUNT_SM) {
      prefix = TX_SIGN_TYPE_ACCOUNT_SM_PREFIX;
    } else {
      prefix = TX_SIGN_TYPE_ACCOUNT_SM_PREFIX;
    }
    return prefix + this.getPublicKey() + signature;
  }

  computeZDigest(msg: string): Buffer | string {
    let utf8Str = Buffer.from(msg, "hex").toString("utf8");
    let r = computeZDigest(utf8Str, this.keyPair, {
      dataEncoding: "utf8",
      keyEncoding: "hex",
      hashEncoding: "hex",
    });
    return r;
  }
}

export function newWalletFromPrivateKey(privateKey: string) {
  return new HyperWallet(privateKey);
}

export function newWalletFromMnemonic(mnemonic: string) {
  const seed = mnemonicToSeedSync(mnemonic);
  const privateKey = seed.slice(0, 32);
  return new HyperWallet(privateKey.toString("hex"));
}

export function didAddressToHex(didAddress: string): string {
  return Buffer.from(didAddress).toString("hex");
}

export function genMnemonic(): string {
  return generateMnemonic();
}
