"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAIN_ID_REDCAVE = exports.DEFAULT_PAGE_NUM = exports.DEFAULT_PAGE_SIZE = exports.DAY = exports.HOUR = exports.MINUTE = exports.SECOND = exports.MILLISECOND = exports.TX_OPTIONAL_FIELD_CONTRACT_NAME = exports.TX_OPTIONAL_FIELD_TIMESTAMP = exports.TX_OPTIONAL_FIELD_UNSIGN_DATA = exports.TX_OPTIONAL_FIELD_SIMULATE = exports.TX_OPTIONAL_FIELD_INVALID = exports.TX_OPTIONAL_FIELD_INVALID_MSG = exports.TX_OPTIONAL_FIELD_HASH = exports.TX_OPTIONAL_FIELD_OP_CODE = exports.TX_OPTIONAL_FIELD_PAYLOAD = exports.TX_OPTIONAL_FIELD_EXTRA_ID_LONG = exports.TX_OPTIONAL_FIELD_EXTRA_ID_STRING = exports.TX_OPTIONAL_FIELD_EXTRA_ID_64 = exports.TX_OPTIONAL_FIELD_EXTRA = exports.TX_OPTIONAL_FIELD_SIGNATURE = exports.TX_OPTIONAL_FIELD_TYPE = exports.TX_OPTIONAL_FIELD_VALUE = exports.TX_OPTIONAL_FIELD_TO = exports.TX_OPTIONAL_FIELD_FROM = exports.TX_OPTIONAL_TYPE_TRANSFER = exports.TX_OPTIONAL_TYPE_HVM = exports.TX_OPTIONAL_TYPE_EVM = exports.EVENT_SUB_ADDRESS = exports.EVENT_SUB_STATUS = exports.EVENT_SUB_NETWORK = exports.EVENT_SUB_BLOCK = exports.EVENT_SUB_TX = exports.METHOD_ASSET_GET_TRANSFER_HISTORY = exports.METHOD_ASSET_GET_BY_DID = exports.METHOD_DID_GET_ALL_CHAIN_ID = exports.METHOD_DID_GET_BY_PUBKEY = exports.METHOD_DID_GET_REGISTER_UNSIGN = exports.METHOD_DID_GEN_ADDRESS = exports.METHOD_CONTRACT_GET_ABI = exports.METHOD_CONTRACT_GET_INPUT_DATA = exports.METHOD_TX_GET_RECEIPT_BY_HASH = exports.METHOD_TX_SEND_ASYNC = exports.METHOD_TX_SEND = exports.METHOD_TX_GET_UNSIGN = exports.METHOD_ACCOUNT_GET_SM2_ADDRESS = exports.METHOD_ACCOUNT_CHECK_KYC = exports.METHOD_ACCOUNT_KYC = exports.METHOD_ACCOUNT_PRE_KYC = void 0;
exports.ERROR_CONNECTION_NOT_OPEN = exports.DID_PREFIX = exports.TX_SIGN_TYPE_DID_SM_PREFIX = exports.TX_SIGN_TYPE_ACCOUNT_SM_PREFIX = exports.TX_SIGN_TYPE_ACCOUNT_SM = exports.TX_SIGN_TYPE_DID_SM = exports.TX_SIGN_TYPE_DEFAULT_SM = exports.ChainIDType = void 0;
//rpc method
exports.METHOD_ACCOUNT_PRE_KYC = "account_preKyc";
exports.METHOD_ACCOUNT_KYC = "account_kyc";
exports.METHOD_ACCOUNT_CHECK_KYC = "account_checkKyc";
exports.METHOD_ACCOUNT_GET_SM2_ADDRESS = "account_getSm2Address";
exports.METHOD_TX_GET_UNSIGN = "tx_getUnsignTx";
exports.METHOD_TX_SEND = "tx_sendTx";
exports.METHOD_TX_SEND_ASYNC = "tx_sendTxAsync";
exports.METHOD_TX_GET_RECEIPT_BY_HASH = "tx_getTxReceiptByHash";
exports.METHOD_CONTRACT_GET_INPUT_DATA = "contract_getInputData";
exports.METHOD_CONTRACT_GET_ABI = "contract_getAbi";
exports.METHOD_DID_GEN_ADDRESS = "did_genDIDAddress";
exports.METHOD_DID_GET_REGISTER_UNSIGN = "did_getRegisterUnsignTx";
exports.METHOD_DID_GET_BY_PUBKEY = "did_getDIDByPubKey";
exports.METHOD_DID_GET_ALL_CHAIN_ID = "did_allChainId";
exports.METHOD_ASSET_GET_BY_DID = "asset_getByDID";
exports.METHOD_ASSET_GET_TRANSFER_HISTORY = "asset_getTransferHis";
//event subscribe
exports.EVENT_SUB_TX = "tx";
exports.EVENT_SUB_BLOCK = "block";
exports.EVENT_SUB_NETWORK = "network";
exports.EVENT_SUB_STATUS = "status";
exports.EVENT_SUB_ADDRESS = "address";
//tx optional fields
exports.TX_OPTIONAL_TYPE_EVM = "EVM";
exports.TX_OPTIONAL_TYPE_HVM = "HVM";
exports.TX_OPTIONAL_TYPE_TRANSFER = "TRANSFER";
exports.TX_OPTIONAL_FIELD_FROM = "from";
exports.TX_OPTIONAL_FIELD_TO = "to";
exports.TX_OPTIONAL_FIELD_VALUE = "value";
exports.TX_OPTIONAL_FIELD_TYPE = "type";
exports.TX_OPTIONAL_FIELD_SIGNATURE = "signature";
exports.TX_OPTIONAL_FIELD_EXTRA = "extra";
exports.TX_OPTIONAL_FIELD_EXTRA_ID_64 = "extraIdInt64";
exports.TX_OPTIONAL_FIELD_EXTRA_ID_STRING = "extraIdString";
exports.TX_OPTIONAL_FIELD_EXTRA_ID_LONG = "extraIdLong";
exports.TX_OPTIONAL_FIELD_PAYLOAD = "payload";
exports.TX_OPTIONAL_FIELD_OP_CODE = "opCode";
exports.TX_OPTIONAL_FIELD_HASH = "hash";
exports.TX_OPTIONAL_FIELD_INVALID_MSG = "invalidMsg";
exports.TX_OPTIONAL_FIELD_INVALID = "invalid";
exports.TX_OPTIONAL_FIELD_SIMULATE = "simulate";
exports.TX_OPTIONAL_FIELD_UNSIGN_DATA = "unsignData";
exports.TX_OPTIONAL_FIELD_TIMESTAMP = "timestamp";
exports.TX_OPTIONAL_FIELD_CONTRACT_NAME = "contractName";
// time
exports.MILLISECOND = 1;
exports.SECOND = exports.MILLISECOND * 1000;
exports.MINUTE = exports.SECOND * 60;
exports.HOUR = exports.MINUTE * 60;
exports.DAY = exports.HOUR * 24;
// page
exports.DEFAULT_PAGE_SIZE = 10;
exports.DEFAULT_PAGE_NUM = 1;
//chain id RedCave 
exports.CHAIN_ID_REDCAVE = "RedCave";
//chain types 
var ChainIDType;
(function (ChainIDType) {
    ChainIDType["CHAIN_ID_REDCAVE"] = "RedCave";
})(ChainIDType = exports.ChainIDType || (exports.ChainIDType = {}));
;
//SM account sign return [signature]
exports.TX_SIGN_TYPE_DEFAULT_SM = "DEFAULT_SM";
//SM account did transfer return [81 + pubkey + signature]
exports.TX_SIGN_TYPE_DID_SM = "DID_SM";
//SM account transfer return [01 + pubkey + signature]
exports.TX_SIGN_TYPE_ACCOUNT_SM = "ACCOUNT_SM";
//account sign prefix
exports.TX_SIGN_TYPE_ACCOUNT_SM_PREFIX = "01";
//account did sign prefix
exports.TX_SIGN_TYPE_DID_SM_PREFIX = "81";
//did prefix 
exports.DID_PREFIX = "did:hpc:";
//websoket not open 
exports.ERROR_CONNECTION_NOT_OPEN = { "error": { "message": "Please try again later" } };
//# sourceMappingURL=constant.js.map