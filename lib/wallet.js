"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genMnemonic = exports.didAddressToHex = exports.newWalletFromMnemonic = exports.newWalletFromPrivateKey = exports.HyperWallet = void 0;
var gm_ts_1 = require("gm-ts");
var bip39_1 = require("bip39");
var constant_1 = require("./constant");
var HyperWallet = /** @class */ (function () {
    function HyperWallet(privateKey) {
        this.sm2 = new gm_ts_1.SM2();
        this.keyPair = this.sm2.keyFromPrivate(privateKey, "hex");
    }
    HyperWallet.prototype.sign = function (msg, signType) {
        var r = this.computeZDigest(msg);
        var sig = this.sm2.sign(r, this.keyPair);
        return this.fromateSignature(sig.toDER("hex"), signType);
    };
    HyperWallet.prototype.verify = function (msg, signature) {
        var r = this.computeZDigest(msg);
        return this.sm2.verify(r, Buffer.from(signature, "hex"), this.keyPair);
    };
    HyperWallet.prototype.getPublicKey = function () {
        return this.keyPair.getPublic("hex").toString();
    };
    HyperWallet.prototype.fromateSignature = function (signature, signType) {
        if (!signType) {
            return signature;
        }
        var prefix;
        if (signType === constant_1.TX_SIGN_TYPE_DID_SM) {
            prefix = constant_1.TX_SIGN_TYPE_DID_SM_PREFIX;
        }
        else if (signType === constant_1.TX_SIGN_TYPE_ACCOUNT_SM) {
            prefix = constant_1.TX_SIGN_TYPE_ACCOUNT_SM_PREFIX;
        }
        else {
            prefix = constant_1.TX_SIGN_TYPE_ACCOUNT_SM_PREFIX;
        }
        return prefix + this.getPublicKey() + signature;
    };
    HyperWallet.prototype.computeZDigest = function (msg) {
        var utf8Str = Buffer.from(msg, "hex").toString("utf8");
        var r = (0, gm_ts_1.computeZDigest)(utf8Str, this.keyPair, {
            dataEncoding: "utf8",
            keyEncoding: "hex",
            hashEncoding: "hex",
        });
        return r;
    };
    return HyperWallet;
}());
exports.HyperWallet = HyperWallet;
function newWalletFromPrivateKey(privateKey) {
    return new HyperWallet(privateKey);
}
exports.newWalletFromPrivateKey = newWalletFromPrivateKey;
function newWalletFromMnemonic(mnemonic) {
    var seed = (0, bip39_1.mnemonicToSeedSync)(mnemonic);
    var privateKey = seed.slice(0, 32);
    return new HyperWallet(privateKey.toString("hex"));
}
exports.newWalletFromMnemonic = newWalletFromMnemonic;
function didAddressToHex(didAddress) {
    return Buffer.from(didAddress).toString("hex");
}
exports.didAddressToHex = didAddressToHex;
function genMnemonic() {
    return (0, bip39_1.generateMnemonic)();
}
exports.genMnemonic = genMnemonic;
//# sourceMappingURL=wallet.js.map