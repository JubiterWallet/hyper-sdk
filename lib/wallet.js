"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newWalletFromMnemonic = exports.newWalletFromPrivateKey = exports.HyperWallet = void 0;
var gm_ts_1 = require("gm-ts");
var bip39_1 = require("bip39");
var HyperWallet = /** @class */ (function () {
    function HyperWallet(privateKey) {
        this.sm2 = new gm_ts_1.SM2();
        this.keyPair = this.sm2.keyFromPrivate(privateKey);
    }
    HyperWallet.prototype.sign = function (msg) {
        var sig = this.sm2.sign(Buffer.from(msg, "hex"), this.keyPair);
        return sig.r.toString("hex") + sig.s.toString("hex");
    };
    HyperWallet.prototype.getPublicKey = function () {
        return this.keyPair.getPublic("hex").toString();
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
//# sourceMappingURL=wallet.js.map