"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
test('My Wallet', function () {
    var msg = "aabbccdd";
    // const wallet1 = newWalletFromPrivateKey('5d1c8c8d5cb3d046d72feebd4877ec85d3514206a9efa14223d9b007c7c1820a');
    // const sig1 = wallet1.sign(msg);
    var wallet2 = (0, index_1.newWalletFromMnemonic)('gauge hole clog property soccer idea cycle stadium utility slice hold chief');
    console.log("address ----------->", wallet2.getPublicKey());
    console.log("msg ----------->", msg);
    var sig2 = wallet2.sign(msg);
    console.log("signature ----------->", sig2);
});
//# sourceMappingURL=Wallet.test.js.map