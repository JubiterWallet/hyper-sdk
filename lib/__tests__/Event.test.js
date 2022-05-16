"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
test('My Event', function () {
    var wallet = (0, index_1.newWalletFromMnemonic)('gauge hole clog property soccer idea cycle stadium utility slice hold chief');
    var p = new index_1.HyperProvider('ws://192.168.4.196:6066/ws/v1/1111111', wallet);
    var event = new index_1.HyperTxEvent('tx', 'ToBob', function (value) {
        //这块代码不对，但不知道怎么写
        expect(value).toBe(10 + 10);
    }, true, p);
    event.on(10);
});
//# sourceMappingURL=Event.test.js.map