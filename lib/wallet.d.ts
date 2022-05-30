/// <reference types="node" />
import { SM2 } from "gm-ts";
import { ec } from 'elliptic';
export declare class HyperWallet {
    keyPair: ec.KeyPair;
    sm2: SM2;
    constructor(privateKey: string);
    sign(msg: string, signType?: string): string;
    verify(msg: string, signature: string): boolean;
    getPublicKey(): string;
    fromateSignature(signature: string, signType?: string): string;
    computeZDigest(msg: string): Buffer | string;
}
export declare function newWalletFromPrivateKey(privateKey: string): HyperWallet;
export declare function newWalletFromMnemonic(mnemonic: string): HyperWallet;
export declare function didAddressToHex(didAddress: string): string;
