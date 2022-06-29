//rpc method
export const METHOD_ACCOUNT_PRE_KYC = "account_preKyc";
export const METHOD_ACCOUNT_KYC = "account_kyc";
export const METHOD_ACCOUNT_CHECK_KYC = "account_checkKyc";

export const METHOD_ACCOUNT_GET_SM2_ADDRESS = "account_getSm2Address";

export const METHOD_TX_GET_UNSIGN = "tx_getUnsignTx";
export const METHOD_TX_SEND = "tx_sendTx";
export const METHOD_TX_SEND_ASYNC = "tx_sendTxAsync";
export const METHOD_TX_GET_RECEIPT_BY_HASH = "tx_getTxReceiptByHash";

export const METHOD_CONTRACT_GET_INPUT_DATA = "contract_getInputData";
export const METHOD_CONTRACT_GET_ABI = "contract_getAbi";

export const METHOD_DID_GEN_ADDRESS = "did_genDIDAddress";
export const METHOD_DID_GET_REGISTER_UNSIGN = "did_getRegisterUnsignTx";
export const METHOD_DID_GET_BY_PUBKEY = "did_getDIDByPubKey";
export const METHOD_DID_GET_ALL_CHAIN_ID = "did_allChainId";
export const METHOD_ASSET_GET_BY_DID = "asset_getByDID";
export const METHOD_ASSET_GET_TRANSFER_HISTORY = "asset_getTransferHis";




//event subscribe
export const EVENT_SUB_TX = "tx";
export const EVENT_SUB_BLOCK = "block";
export const EVENT_SUB_NETWORK = "network";
export const EVENT_SUB_STATUS = "status";
export const EVENT_SUB_ADDRESS = "address";

//tx optional fields
export const TX_OPTIONAL_TYPE_EVM = "EVM";
export const TX_OPTIONAL_TYPE_HVM = "HVM";
export const TX_OPTIONAL_TYPE_TRANSFER = "TRANSFER";
export const TX_OPTIONAL_FIELD_FROM = "from";
export const TX_OPTIONAL_FIELD_TO = "to";
export const TX_OPTIONAL_FIELD_VALUE = "value";
export const TX_OPTIONAL_FIELD_TYPE = "type";
export const TX_OPTIONAL_FIELD_SIGNATURE = "signature";
export const TX_OPTIONAL_FIELD_EXTRA = "extra";
export const TX_OPTIONAL_FIELD_EXTRA_ID_64 = "extraIdInt64"
export const TX_OPTIONAL_FIELD_EXTRA_ID_STRING = "extraIdString"
export const TX_OPTIONAL_FIELD_EXTRA_ID_LONG = "extraIdLong"
export const TX_OPTIONAL_FIELD_PAYLOAD = "payload";
export const TX_OPTIONAL_FIELD_OP_CODE = "opCode";
export const TX_OPTIONAL_FIELD_HASH = "hash";
export const TX_OPTIONAL_FIELD_INVALID_MSG = "invalidMsg";
export const TX_OPTIONAL_FIELD_INVALID = "invalid";
export const TX_OPTIONAL_FIELD_SIMULATE = "simulate";
export const TX_OPTIONAL_FIELD_UNSIGN_DATA = "unsignData";
export const TX_OPTIONAL_FIELD_TIMESTAMP = "timestamp";
export const TX_OPTIONAL_FIELD_CONTRACT_NAME = "contractName";
// time
export const MILLISECOND = 1;
export const SECOND = MILLISECOND * 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

// page
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_NUM = 1;

//chain id RedCave 
export const CHAIN_ID_REDCAVE = "RedCave";

//chain types 
export enum ChainIDType {
    CHAIN_ID_REDCAVE = "RedCave",
};
//SM account sign return [signature]
export const TX_SIGN_TYPE_DEFAULT_SM = "DEFAULT_SM";
//SM account did transfer return [81 + pubkey + signature]
export const TX_SIGN_TYPE_DID_SM = "DID_SM";
//SM account transfer return [01 + pubkey + signature]
export const TX_SIGN_TYPE_ACCOUNT_SM = "ACCOUNT_SM";
//account sign prefix
export const TX_SIGN_TYPE_ACCOUNT_SM_PREFIX = "01";
//account did sign prefix
export const TX_SIGN_TYPE_DID_SM_PREFIX = "81";
//did prefix 
export const DID_PREFIX = "did:hpc:";
//websoket not open 
export const ERROR_CONNECTION_NOT_OPEN = { "error": { "message": "Please try again later" } };