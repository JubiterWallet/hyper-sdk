"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperProvider = void 0;
// import { WebSocket } from "ws";
var event_1 = require("./event");
var constant_1 = require("./constant");
var NextId = 1;
var HyperProvider = /** @class */ (function () {
    function HyperProvider(url, wallet, options) {
        this.requests = {};
        this.events = {};
        this.url = url;
        this.wallet = wallet;
        this.address = null;
        this.didAddress = {};
        this.reconnectAttempts = 0;
        this.reconnecting = false;
        this.options = options || {
            delay: 5000,
            maxAttempts: false,
        };
    }
    HyperProvider.prototype.open = function () {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            if (_this_1.ws == undefined) {
                _this_1.ws = new WebSocket(_this_1.url);
                _this_1.ws.onopen = function (e) {
                    _this_1.reconnecting = false;
                    _this_1.reconnectAttempts = 0;
                    console.log('open successed');
                    resolve(e);
                };
                _this_1.ws.onerror = function (e) { return __awaiter(_this_1, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        console.log('open failed', e);
                        if (this.reconnecting || ((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.CLOSED) {
                            return [2 /*return*/];
                        }
                        reject(e);
                        return [2 /*return*/];
                    });
                }); };
                _this_1.ws.onclose = function (e) { return __awaiter(_this_1, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(1000 != e.code || 1001 != e.code || e.wasClean === false)) return [3 /*break*/, 2];
                                this.ws = undefined;
                                return [4 /*yield*/, this.reconnect()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                            case 2:
                                resolve(true);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                _this_1.ws.onmessage = function (messageEvent) {
                    var data = messageEvent.data;
                    var result = JSON.parse(data);
                    if (result.id != null) {
                        var id = String(result.id);
                        var request = _this_1.requests[id];
                        delete _this_1.requests[id];
                        if (result.result !== undefined) {
                            request.callback(null, result.result);
                        }
                        else {
                            //code message
                            if (result.code != 0) {
                                return request.callback(undefined, { error: result });
                            }
                            // let error: Error | null = null;
                            // if (result.error) {
                            //   error = new Error(result.error.message || 'unknown error');
                            // }
                            // else {
                            //   error = new Error('unknown error');
                            // }
                            request.callback(undefined, { error: { message: result.error.message || 'unknown error' } });
                        }
                    }
                };
            }
        });
    };
    HyperProvider.prototype.send = function (method, params) {
        var _this_1 = this;
        var _a;
        var rid = NextId++;
        if (this.reconnecting || this.ws === undefined || ((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) !== WebSocket.OPEN) {
            return new Promise(function (resolve) { resolve(constant_1.ERROR_CONNECTION_NOT_OPEN); });
        }
        return new Promise(function (resolve, reject) {
            function callback(error, result) {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            }
            var payload = JSON.stringify({
                method: method,
                params: params,
                id: rid,
                namespace: 'global',
                jsonrpc: '2.0',
            });
            _this_1.requests[String(rid)] = { callback: callback, payload: payload };
            if (_this_1.ws) {
                _this_1.ws.send(payload);
            }
        });
    };
    HyperProvider.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var publicKey, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.address)
                            return [2 /*return*/, this.address];
                        publicKey = this.wallet.getPublicKey();
                        return [4 /*yield*/, this.send(constant_1.METHOD_ACCOUNT_GET_SM2_ADDRESS, [publicKey])];
                    case 1:
                        address = _a.sent();
                        if (!!(address === null || address === void 0 ? void 0 : address.error)) {
                            return [2 /*return*/, address];
                        }
                        this.address = address;
                        return [2 /*return*/, this.address];
                }
            });
        });
    };
    HyperProvider.prototype.getDIDAddress = function (chainId) {
        return __awaiter(this, void 0, void 0, function () {
            var publicKey, didAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.didAddress[chainId])
                            return [2 /*return*/, this.didAddress[chainId]];
                        publicKey = this.wallet.getPublicKey();
                        return [4 /*yield*/, this.send(constant_1.METHOD_DID_GEN_ADDRESS, [{ "pubKey": publicKey, "chainID": chainId }])];
                    case 1:
                        didAddress = _a.sent();
                        if (!!(didAddress === null || didAddress === void 0 ? void 0 : didAddress.error)) {
                            return [2 /*return*/, didAddress];
                        }
                        this.didAddress[chainId] = didAddress;
                        return [2 /*return*/, this.didAddress[chainId]];
                }
            });
        });
    };
    HyperProvider.prototype.registerDID = function (chainId) {
        return __awaiter(this, void 0, void 0, function () {
            var publicKey, unsignData, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        publicKey = this.wallet.getPublicKey();
                        return [4 /*yield*/, this.send(constant_1.METHOD_DID_GET_REGISTER_UNSIGN_DATA, [{ "pubKey": publicKey, "chainID": chainId }])];
                    case 1:
                        unsignData = _a.sent();
                        if (!!(unsignData === null || unsignData === void 0 ? void 0 : unsignData.error)) {
                            return [2 /*return*/, unsignData];
                        }
                        return [4 /*yield*/, this.wallet.sign(unsignData, constant_1.TX_SIGN_TYPE_DID_SM)];
                    case 2:
                        signature = _a.sent();
                        return [2 /*return*/, this.send(constant_1.METHOD_DID_SEND_REGISTER_TX, [{ "unsignData": unsignData, "signature": signature, "async": false }])];
                }
            });
        });
    };
    HyperProvider.prototype.getDIDDocument = function (didAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(constant_1.METHOD_DID_GET_DOCUMENT, [didAddress])];
            });
        });
    };
    HyperProvider.prototype.getDIDStatus = function (didAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var didState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.send(constant_1.METHOD_DID_GET_ADDRESS_STATUS, [didAddress])];
                    case 1:
                        didState = _a.sent();
                        return [2 /*return*/, ((didState === null || didState === void 0 ? void 0 : didState.status) === 1)];
                }
            });
        });
    };
    HyperProvider.prototype.getChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(constant_1.METHOD_DID_GET_CHAIN_ID, [])];
            });
        });
    };
    HyperProvider.prototype.getAllChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(constant_1.METHOD_DID_GET_ALL_CHAIN_ID, [])];
            });
        });
    };
    HyperProvider.prototype.getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(constant_1.METHOD_ACCOUNT_GET_BALANCE, address)];
            });
        });
    };
    //此接口需要组织各式各样的交易，待细化
    HyperProvider.prototype.buildUnsignedTx = function (unsignedTx, txType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //需要调用RPC接口组织待签名交易
                if (txType) {
                    return [2 /*return*/, this.send(constant_1.METHOD_TX_GET_UNSIGN_DATA, [unsignedTx])];
                }
                return [2 /*return*/, this.send(constant_1.METHOD_TX_GET_UNSIGN_DATA, [unsignedTx])];
            });
        });
    };
    HyperProvider.prototype.signTx = function (txRaw, signType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallet.sign(txRaw, signType)];
            });
        });
    };
    HyperProvider.prototype.signMessage = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallet.sign(msg, undefined)];
            });
        });
    };
    HyperProvider.prototype.verifyMessage = function (msg, signature) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallet.verify(msg, signature)];
            });
        });
    };
    HyperProvider.prototype.broadcastTx = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //需要调用RPC接口广播交易
                return [2 /*return*/, this.send(constant_1.METHOD_TX_SEND, [{ "unsignData": tx.hex, "signature": tx.signature, "async": false }])]; //txid
            });
        });
    };
    HyperProvider.prototype.buildContractPayload = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(constant_1.METHOD_CONTRACT_GET_INPUT_DATA, [payload])];
            });
        });
    };
    HyperProvider.prototype.subscribe = function (type, tag, listener, once) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        if (type === constant_1.EVENT_SUB_TX) {
            var event_2 = new event_1.HyperTxEvent(type, tag, listener, once, this);
            event_2.on(args);
            this.events[tag] = event_2;
        }
        else if (type === constant_1.EVENT_SUB_STATUS) {
            var event_3 = new event_1.HyperStatusEvent(type, tag, listener, once, this);
            event_3.on(args);
            this.events[tag] = event_3;
        }
    };
    HyperProvider.prototype.unsubscribe = function (tag) {
        var event = this.events[tag];
        event.clear();
        delete this.events[tag];
    };
    HyperProvider.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.ws) return [3 /*break*/, 3];
                        if (!(this.ws.readyState === WebSocket.CONNECTING)) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve) {
                                if (_this_1.ws) {
                                    _this_1.ws.onopen = function () {
                                        resolve(true);
                                    };
                                    _this_1.ws.onerror = function () {
                                        resolve(false);
                                    };
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // Hangup
                        // See: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
                        this.ws.close(1000);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HyperProvider.prototype.reconnect = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _this = this;
                        this.reconnecting = true;
                        if (!(!((_a = this.options) === null || _a === void 0 ? void 0 : _a.maxAttempts) ||
                            this.reconnectAttempts < ((_b = this.options) === null || _b === void 0 ? void 0 : _b.maxAttempts))) return [3 /*break*/, 2];
                        _this.reconnectAttempts++;
                        return [4 /*yield*/, setTimeout(function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, _this.open()];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            }, (_c = this.options) === null || _c === void 0 ? void 0 : _c.delay)];
                    case 1:
                        _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.reconnecting = false;
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HyperProvider.prototype.connected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (this.ws != undefined && this.ws.readyState === WebSocket.OPEN)];
            });
        });
    };
    return HyperProvider;
}());
exports.HyperProvider = HyperProvider;
//# sourceMappingURL=provider.js.map