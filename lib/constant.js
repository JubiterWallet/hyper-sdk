"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainIDType = exports.TX_OPTIONAL_FIELD_HASH = exports.TX_OPTIONAL_FIELD_OP_CODE = exports.TX_OPTIONAL_FIELD_PAYLOAD = exports.TX_OPTIONAL_FIELD_EXTRA_ID_STRING = exports.TX_OPTIONAL_FIELD_EXTRA_ID_64 = exports.TX_OPTIONAL_FIELD_EXTRA = exports.TX_OPTIONAL_FIELD_SIGNATURE = exports.TX_OPTIONAL_FIELD_TYPE = exports.TX_OPTIONAL_FIELD_VALUE = exports.TX_OPTIONAL_TYPE_TRANSFER = exports.TX_OPTIONAL_TYPE_HVM = exports.TX_OPTIONAL_TYPE_EVM = exports.EVENT_SUB_ADDRESS = exports.EVENT_SUB_NETWORK = exports.EVENT_SUB_BLOCK = exports.EVENT_SUB_TX = exports.METHOD_DID_GET_ADDRESS_STATUS = exports.METHOD_DID_GET_DOCUMENT = exports.METHOD_DID_GET_CHAIN_ID = exports.METHOD_DID_SEND_REGISTER_TX = exports.METHOD_DID_GET_REGISTER_UNSIGN_DATA = exports.METHOD_DID_GEN_ADDRESS = exports.METHOD_NODE_GET = exports.METHOD_CONTRACT_GET_INPUT_DATA = exports.METHOD_BLOCK_GET_LATEST_BLOCK = exports.METHOD_TX_GET_TX_BY_HASH = exports.METHOD_TX_SEND = exports.METHOD_TX_GET_UNSIGN_DATA = exports.METHOD_ACCOUNT_GET_BALANCE = exports.METHOD_ACCOUNT_GET_SM2_ADDRESS = void 0;
//rpc method
exports.METHOD_ACCOUNT_GET_SM2_ADDRESS = "account_getSm2Address";
exports.METHOD_ACCOUNT_GET_BALANCE = "account_getBalance";
exports.METHOD_TX_GET_UNSIGN_DATA = "tx_getUnsignData";
exports.METHOD_TX_SEND = "tx_sendTx";
exports.METHOD_TX_GET_TX_BY_HASH = "tx_getTxByHash";
exports.METHOD_BLOCK_GET_LATEST_BLOCK = "block_getLatestBlock";
exports.METHOD_CONTRACT_GET_INPUT_DATA = "contract_getInputData";
exports.METHOD_NODE_GET = "node_getNodes";
exports.METHOD_DID_GEN_ADDRESS = "did_genDIDAddress";
exports.METHOD_DID_GET_REGISTER_UNSIGN_DATA = "did_getRegisterUnsignData";
exports.METHOD_DID_SEND_REGISTER_TX = "did_sendRegisterTx";
exports.METHOD_DID_GET_CHAIN_ID = "did_getChainId";
exports.METHOD_DID_GET_DOCUMENT = "did_getDIDDocument";
exports.METHOD_DID_GET_ADDRESS_STATUS = "did_getAddressStatus";
exports.EVENT_SUB_TX = "tx";
exports.EVENT_SUB_BLOCK = "block";
exports.EVENT_SUB_NETWORK = "network";
exports.EVENT_SUB_ADDRESS = "address";
//tx optional fields
exports.TX_OPTIONAL_TYPE_EVM = "EVM";
exports.TX_OPTIONAL_TYPE_HVM = "HVM";
exports.TX_OPTIONAL_TYPE_TRANSFER = "TRANSFER";
exports.TX_OPTIONAL_FIELD_VALUE = "value";
exports.TX_OPTIONAL_FIELD_TYPE = "type";
exports.TX_OPTIONAL_FIELD_SIGNATURE = "signature";
exports.TX_OPTIONAL_FIELD_EXTRA = "extra";
exports.TX_OPTIONAL_FIELD_EXTRA_ID_64 = "extraIdInt64";
exports.TX_OPTIONAL_FIELD_EXTRA_ID_STRING = "extraIdString";
exports.TX_OPTIONAL_FIELD_PAYLOAD = "payload";
exports.TX_OPTIONAL_FIELD_OP_CODE = "opCode";
exports.TX_OPTIONAL_FIELD_HASH = "hash";
//
var ChainIDType;
(function (ChainIDType) {
    ChainIDType[ChainIDType["RedCave"] = 0] = "RedCave";
})(ChainIDType = exports.ChainIDType || (exports.ChainIDType = {}));
//# sourceMappingURL=constant.js.map