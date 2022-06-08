export declare const METHOD_ACCOUNT_GET_SM2_ADDRESS = "account_getSm2Address";
export declare const METHOD_ACCOUNT_GET_BALANCE = "account_getBalance";
export declare const METHOD_TX_GET_UNSIGN_DATA = "tx_getUnsignData";
export declare const METHOD_TX_SEND = "tx_sendTx";
export declare const METHOD_TX_GET_TX_BY_HASH = "tx_getTxByHash";
export declare const METHOD_BLOCK_GET_LATEST_BLOCK = "block_getLatestBlock";
export declare const METHOD_CONTRACT_GET_INPUT_DATA = "contract_getInputData";
export declare const METHOD_NODE_GET = "node_getNodes";
export declare const METHOD_DID_GEN_ADDRESS = "did_genDIDAddress";
export declare const METHOD_DID_GET_REGISTER_UNSIGN_DATA = "did_getRegisterUnsignData";
export declare const METHOD_DID_SEND_REGISTER_TX = "did_sendRegisterTx";
export declare const METHOD_DID_GET_CHAIN_ID = "did_getChainId";
export declare const METHOD_DID_GET_DOCUMENT = "did_getDIDDocument";
export declare const METHOD_DID_GET_ADDRESS_STATUS = "did_getAddressStatus";
export declare const METHOD_DID_GET_ALL_CHAIN_ID = "did_allChainId";
export declare const EVENT_SUB_TX = "tx";
export declare const EVENT_SUB_BLOCK = "block";
export declare const EVENT_SUB_NETWORK = "network";
export declare const EVENT_SUB_STATUS = "status";
export declare const EVENT_SUB_ADDRESS = "address";
export declare const TX_OPTIONAL_TYPE_EVM = "EVM";
export declare const TX_OPTIONAL_TYPE_HVM = "HVM";
export declare const TX_OPTIONAL_TYPE_TRANSFER = "TRANSFER";
export declare const TX_OPTIONAL_FIELD_VALUE = "value";
export declare const TX_OPTIONAL_FIELD_TYPE = "type";
export declare const TX_OPTIONAL_FIELD_SIGNATURE = "signature";
export declare const TX_OPTIONAL_FIELD_EXTRA = "extra";
export declare const TX_OPTIONAL_FIELD_EXTRA_ID_64 = "extraIdInt64";
export declare const TX_OPTIONAL_FIELD_EXTRA_ID_STRING = "extraIdString";
export declare const TX_OPTIONAL_FIELD_PAYLOAD = "payload";
export declare const TX_OPTIONAL_FIELD_OP_CODE = "opCode";
export declare const TX_OPTIONAL_FIELD_HASH = "hash";
export declare const TX_OPTIONAL_FIELD_INVALID_MSG = "invalidMsg";
export declare const TX_OPTIONAL_FIELD_INVALID = "invalid";
export declare enum ChainIDType {
    "RedCave" = "RedCave"
}
export declare enum TransactionSignPrefixType {
    "ACCOUNT_SM" = "01",
    "DID_SM" = "81"
}
export declare const TX_SIGN_TYPE_DID_SM = "DID_SM";
export declare const TX_SIGN_TYPE_ACCOUNT_SM = "ACCOUNT_SM";
export declare const TX_SIGN_TYPE_ACCOUNT_SM_PREFIX = "01";
export declare const TX_SIGN_TYPE_DID_SM_PREFIX = "81";
export declare const DID_PREFIX = "did:hpc:";
export declare const ERROR_CONNECTION_NOT_OPEN = "{ \"error\": \"Please try again later\" }";
