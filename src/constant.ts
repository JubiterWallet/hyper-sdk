//rpc method
export const METHOD_ACCOUNT_GET_SM2_ADDRESS = "account_getSm2Address";
export const METHOD_ACCOUNT_GET_BALANCE = "account_getBalance";
export const METHOD_TX_GET_UNSIGN_DATA = "tx_getUnsignData";
export const METHOD_TX_SEND = "tx_sendTx";
export const METHOD_TX_GET_TX_BY_HASH = "tx_getTxByHash";
export const METHOD_BLOCK_GET_LATEST_BLOCK = "block_getLatestBlock";
export const METHOD_CONTRACT_GET_INPUT_DATA = "contract_getInputData";
export const METHOD_NODE_GET = "node_getNodes";

export const METHOD_DID_GEN_ADDRESS = "did_genDIDAddress";
export const METHOD_DID_GET_REGISTER_UNSIGN_DATA = "did_getRegisterUnsignData";
export const METHOD_DID_SEND_REGISTER_TX = "did_sendRegisterTx";
export const METHOD_DID_GET_CHAIN_ID = "did_getChainId";
export const METHOD_DID_GET_DOCUMENT = "did_getDIDDocument";
export const METHOD_DID_GET_ADDRESS_STATUS = "did_getAddressStatus";
export const METHOD_DID_GET_ALL_CHAIN_ID = "did_allChainId";



export const EVENT_SUB_TX = "tx";
export const EVENT_SUB_BLOCK = "block";
export const EVENT_SUB_NETWORK = "network";
export const EVENT_SUB_STATUS = "status";
export const EVENT_SUB_ADDRESS = "address";

//tx optional fields
export const TX_OPTIONAL_TYPE_EVM = "EVM";
export const TX_OPTIONAL_TYPE_HVM = "HVM";
export const TX_OPTIONAL_TYPE_TRANSFER = "TRANSFER";
export const TX_OPTIONAL_FIELD_VALUE = "value";
export const TX_OPTIONAL_FIELD_TYPE = "type";
export const TX_OPTIONAL_FIELD_SIGNATURE = "signature";
export const TX_OPTIONAL_FIELD_EXTRA = "extra";
export const TX_OPTIONAL_FIELD_EXTRA_ID_64 = "extraIdInt64"
export const TX_OPTIONAL_FIELD_EXTRA_ID_STRING = "extraIdString"
export const TX_OPTIONAL_FIELD_PAYLOAD = "payload";
export const TX_OPTIONAL_FIELD_OP_CODE = "opCode";
export const TX_OPTIONAL_FIELD_HASH = "hash";
export const TX_OPTIONAL_FIELD_INVALID_MSG = "invalidMsg";
export const TX_OPTIONAL_FIELD_INVALID = "invalid";

//
export enum ChainIDType {
    "RedCave" = "RedCave",
}

export enum TransactionSignPrefixType {
    "ACCOUNT_SM" = "01",
    "DID_SM" = "81",
}
//SM account did 
export const TX_SIGN_TYPE_DID_SM = "DID_SM";
//SM account transfer
export const TX_SIGN_TYPE_ACCOUNT_SM = "ACCOUNT_SM";

export const TX_SIGN_TYPE_ACCOUNT_SM_PREFIX = "01";
export const TX_SIGN_TYPE_DID_SM_PREFIX = "81";

export const DID_PREFIX = "did:hpc:";

// websoket not open 
export const ERROR_CONNECTION_NOT_OPEN = '{ "error": "Please try again later" }';
