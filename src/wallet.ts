import { SM2, computeZDigest } from "gm-ts";
import { ec } from 'elliptic';
import { mnemonicToSeedSync } from 'bip39';

export class HyperWallet {
  keyPair: ec.KeyPair;
  sm2: SM2;
  constructor(privateKey: string) {
    this.sm2 = new SM2();
    this.keyPair = this.sm2.keyFromPrivate(privateKey);
  }

  sign(msg: string) {
    // let r = this.computeZDigest(msg);
    const sig = this.sm2.sign(Buffer.from(msg, "hex"), this.keyPair);
    return this.fromateSM2Signature(sig.toDER("hex"));
  }

  verify(msg: string, signature: string): boolean {
    let r = this.computeZDigest(msg);
    return this.sm2.verify(Buffer.from(msg, "hex"), Buffer.from(signature, "hex"), this.keyPair);
  }

  getPublicKey(): string {
    return this.keyPair.getPublic("hex").toString();
  }

  fromateSM2Signature(signature: string): string {
    return "01" + this.getPublicKey() + signature;
  }

  computeZDigest(msg: string): string {
    // let utf8Str = Buffer.from(msg, "hex").toString("utf8");
    // let r = computeZDigest(utf8Str, this.keyPair, {
    //   dataEncoding: 'utf8',
    //   keyEncoding: 'hex',
    //   hashEncoding: 'hex',
    // });
    // return r;
    return ""
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

export function hexToArray(hexString: string) {
  let byte = [];
  let utf8Buffer = Buffer.from(hexString, "utf8");
  for (var i = 0; i < utf8Buffer.length; i++) {
    let byteTemp = utf8Buffer[i];
    byte.push(byteTemp);
  }
  return byte;
};