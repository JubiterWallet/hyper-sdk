import { SM2, computeZDigest } from "gm-ts";
import { ec } from 'elliptic';
import { mnemonicToSeedSync } from 'bip39';

export class HyperWallet {
  keyPair: ec.KeyPair;
  sm2: SM2;
  constructor(privateKey: string) {
    this.sm2 = new SM2();
    this.keyPair = this.sm2.keyFromPrivate(privateKey,"hex");
  }

  sign(msg: string) {
   
    console.log("public  X  -------------->",this.keyPair.getPublic().getX().toString("hex"));
    console.log("public  Y-------------->",this.keyPair.getPublic().getY().toString("hex"));
    console.log("sign msg -------------->",msg);
    let r = this.computeZDigest(msg);
    const sig = this.sm2.sign(r, this.keyPair);
    console.log("sign r-------------->",sig.r.toString("hex"));
    console.log("sign s-------------->",sig.s.toString("hex"));
    console.log("sign toDER-------------->",sig.toDER("hex"));
    // const sig = this.sm2.sign(Buffer.from(msg, "hex"), this.keyPair);
    return this.fromateSM2Signature(sig.toDER("hex"));
  }

  verify(msg: string, signature: string): boolean {
    let r = this.computeZDigest(msg);
    return this.sm2.verify(r, Buffer.from(signature, "hex"), this.keyPair);
    // return this.sm2.verify(Buffer.from(msg, "hex"), Buffer.from(signature, "hex"), this.keyPair);
  }

  getPublicKey(): string {
    return this.keyPair.getPublic("hex").toString();
  }

  fromateSM2Signature(signature: string): string {
    return "01" + this.getPublicKey() + signature;
  }

  computeZDigest(msg: string): Buffer|string {
    let utf8Str = Buffer.from(msg, "hex").toString("utf8");
    console.log("sign msg utf8Str-------------->",utf8Str);
    let r = computeZDigest(utf8Str, this.keyPair, {
      dataEncoding: 'utf8',
      keyEncoding: 'hex',
      hashEncoding: 'hex',
    });
    console.log("sign computeZDigest r-------------->",r);
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
