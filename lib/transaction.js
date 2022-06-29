"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIGN_SM_TYPE_MAP = exports.TransactionType = void 0;
var constant_1 = require("./constant");
//tansaction type 
var TransactionType;
(function (TransactionType) {
    TransactionType["EVM"] = "EVM";
    TransactionType["HVM"] = "HVM";
    TransactionType["TRANSFER"] = "TRANSFER";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
/**
 * get transaction signature types
 */
exports.SIGN_SM_TYPE_MAP = (_a = {},
    _a[constant_1.TX_SIGN_TYPE_DEFAULT_SM] = { signType: constant_1.TX_SIGN_TYPE_DEFAULT_SM, prefix: constant_1.TX_SIGN_TYPE_DID_SM_PREFIX },
    _a[constant_1.TX_SIGN_TYPE_ACCOUNT_SM] = { signType: constant_1.TX_SIGN_TYPE_ACCOUNT_SM, prefix: constant_1.TX_SIGN_TYPE_ACCOUNT_SM_PREFIX },
    _a[constant_1.TX_SIGN_TYPE_DID_SM] = { signType: constant_1.TX_SIGN_TYPE_DID_SM, prefix: "" },
    _a);
//# sourceMappingURL=transaction.js.map