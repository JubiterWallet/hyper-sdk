import { SM2 } from "gm-ts";
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
    const sig = this.sm2.sign(hexToArray(msg), this.keyPair);
    return sig.toDER("hex");
  }

  verify(msg: string, signature: string): boolean {
    return this.sm2.verify(hexToArray(msg), Buffer.from(signature, "hex"), this.keyPair);
  }

  getPublicKey(): string {
    return this.keyPair.getPublic("hex").toString();
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




