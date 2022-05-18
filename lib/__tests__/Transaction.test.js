"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_1 = require("../transaction");
test('My Transaction', function () {
    var tx = { from: "from", to: "to", "payload": "0x7b2264696441646472657373223a226469643a6870633a6879706572636861696e494430313a6e42534372344f4a634f4c4d4b5547644a655876222c227374617465223a3", type: transaction_1.TransactionType[2] };
    console.log("Transaction  -----------> ", tx);
});
//# sourceMappingURL=Transaction.test.js.map