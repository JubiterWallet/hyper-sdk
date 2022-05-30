"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.didAddressToHex = exports.newWalletFromMnemonic = exports.newWalletFromPrivateKey = exports.HyperWallet = void 0;
var gm_ts_1 = require("gm-ts");
var bip39_1 = require("bip39");
var HyperWallet = /** @class */ (function () {
    function HyperWallet(privateKey) {
        this.sm2 = new gm_ts_1.SM2();
        this.keyPair = this.sm2.keyFromPrivate(privateKey, "hex");
    }
    HyperWallet.prototype.sign = function (msg) {
        console.log("public  X  -------------->", this.keyPair.getPublic().getX().toString("hex"));
        console.log("public  Y-------------->", this.keyPair.getPublic().getY().toString("hex"));
        console.log("sign msg -------------->", msg);
        var r = this.computeZDigest(msg);
        var sig = this.sm2.sign(r, this.keyPair);
        console.log("sign r-------------->", sig.r.toString("hex"));
        console.log("sign s-------------->", sig.s.toString("hex"));
        console.log("sign toDER-------------->", sig.toDER("hex"));
        // const sig = this.sm2.sign(Buffer.from(msg, "hex"), this.keyPair);
        return this.fromateSM2Signature(sig.toDER("hex"));
    };
    HyperWallet.prototype.verify = function (msg, signature) {
        var r = this.computeZDigest(msg);
        return this.sm2.verify(r, Buffer.from(signature, "hex"), this.keyPair);
        // return this.sm2.verify(Buffer.from(msg, "hex"), Buffer.from(signature, "hex"), this.keyPair);
    };
    HyperWallet.prototype.getPublicKey = function () {
        return this.keyPair.getPublic("hex").toString();
    };
    HyperWallet.prototype.fromateSM2Signature = function (signature) {
        return "01" + this.getPublicKey() + signature;
    };
    HyperWallet.prototype.computeZDigest = function (msg) {
        var utf8Str = Buffer.from(msg, "hex").toString("utf8");
        console.log("sign msg utf8Str-------------->", utf8Str);
        var r = (0, gm_ts_1.computeZDigest)(utf8Str, this.keyPair, {
            dataEncoding: 'utf8',
            keyEncoding: 'hex',
            hashEncoding: 'hex',
        });
        console.log("sign computeZDigest r-------------->", r);
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
//# sourceMappingURL=wallet.js.map