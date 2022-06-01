"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTxSignatureType = exports.TransactionType = void 0;
var constant_1 = require("./constant");
//tansaction type 
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["EVM"] = 0] = "EVM";
    TransactionType[TransactionType["HVM"] = 1] = "HVM";
    TransactionType[TransactionType["TRANSFER"] = 2] = "TRANSFER";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
// get transaction signature types (signature prefix)
function getTxSignatureType() {
    return [constant_1.TX_SIGN_TYPE_DID_SM, constant_1.TX_SIGN_TYPE_ACCOUNT_SM];
}
exports.getTxSignatureType = getTxSignatureType;
//# sourceMappingURL=transaction.js.map