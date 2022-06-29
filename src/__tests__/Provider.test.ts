import { HyperProvider, HyperWallet, newWalletFromMnemonic, genMnemonic, Transaction, PayloadParams, SIGN_SM_TYPE_MAP, didAddressToHex } from '../index';
const APIKEY = "aHlwZXI-MTY1NDQ4NTI0MzIxOQ-Z0pRdlpYemM-MTMyNjU4ODQyMDU1";
const URL = 'ws://192.168.4.196:6066/ws/v1/' + APIKEY;
// let mnemonic = "tiny picture cool cabbage tiger wonder describe toddler illness puppy purpose april";
// let mnemonic = "virtual project reopen scale water stairs tiger rain organ short parent shine";
// let mnemonic = "squeeze practice assume draw dumb expire strong often energy saddle common urban";
// let mnemonic = "tornado employ author ready say supply trim program rug rich direct follow";
// let mnemonic = "mass flag moon short dinner first stamp urban voyage fox renew goat";
// let mnemonic = "play drill office elevator mirror rocket muffin drink prefer despair kiwi tree";
// let mnemonic = "gadget author taste have interest illegal purity lonely view drink obey tornado";
// let mnemonic = "anxiety leg diet history glance sunny forward waste crouch town industry sure";
let mnemonic = "amateur method client regular neutral solve genuine error wear purse flame oak";
let wallet: HyperWallet;
let p: HyperProvider;
beforeAll(async () => {
    mnemonic = genMnemonic();
    console.log("wallet mnemonic----------->", mnemonic);
    wallet = newWalletFromMnemonic(
        mnemonic
    );
    console.log("wallet publicKey ----------->", wallet.getPublicKey());
    console.log("wallet public key X ----------->", wallet.keyPair.getPublic().getX().toString("hex"));
    console.log("wallet public key Y ----------->", wallet.keyPair.getPublic().getY().toString("hex"));
    console.log("wallet privateKey ----------->", wallet.keyPair.getPrivate("hex"));
    p = new HyperProvider(URL, wallet);
    await p.open();
    let didAddress = await p.getDIDAddress();
    console.log("wallet didAddress ----------->", didAddress);
    console.log("HyperProvider opened !! ");
})
describe('test gen account register Account and DID ', () => {
    test('account register ################### ', async () => {
        //  https://www.1024fuli.com/id
        let idCardNo = "52262619730629004X";
        let mobile = "15111111111";
        let name = "张三";
        let isRegister = await p.checkRegister();
        console.log("account registe ----------->", { idCardNo: idCardNo, mobile: mobile, name: name });
        console.log("account isRegister ----------->", isRegister);
        if (!isRegister) {
            let res = await p.preRegister({ idCardNo: idCardNo, mobile: mobile, name: name });
            console.log("pre register id is ----------->", res);
            let result = await p.register("4f4bed482946591c3c4539c271c2777c", "111111");
            console.log("register result ----------->", result);
        }
    });
    // test('account register Did  ################### ', async () => {
    //     let registedDIDAddress = await p.getRegistedDIDAddress();
    //     console.log("registed DID address ----------->", registedDIDAddress);
    //     // if (!registedDIDAddress) {
    //     let tx = await p.registerDID();
    //     if (!!tx?.error) {
    //         console.log("register DID error ----------->", tx);
    //     } else {
    //         console.log("register DID result ----------->", tx);
    //         let txReceipt = await p.getTxReceipt(tx.hash);
    //         console.log("tx receipt result ----------->", txReceipt);
    //     }
    //     // }
    // });
});
// describe('test account transaction | did transaction  send ', () => {
//     test('build Contract Payload  ###################', async () => {
//         let payloadParams: PayloadParams =
//         {
//             methodName: "TestBool(bool,string)",
//             abi: "[{ 'constant': false, 'inputs': [{ 'name': 'a', 'type': 'bool' }, { 'name': 'b', 'type': 'string' }], 'name': 'TestBool', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }]",
//             params: [true, "test"],
//         };
//         let payload = await p.buildContractPayload(payloadParams)
//         console.log("payload ----------->", payload);
//         expect(payload).toEqual("ac9023630000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000")
//     })
//     test('send account tx ###################', async () => {
//         let address = await p.getAddress();
//         console.log("address ----------->", address);
//         let transaction: Transaction = { from: "0x" + address, to: "0xf95fec9c556906cb417663c5db8c566523fe631a", value: 0 };
//         transaction = await p.buildUnsignedTx(transaction, "");
//         console.log("tx unsignTx ----------->", transaction);
//         let unsignData = transaction.unsignData || "";
//         let signature = await p.signTx(unsignData, SIGN_SM_TYPE_MAP.ACCOUNT_SM.signType);
//         transaction.signature = signature;
//         console.log("tx send Tx ----------->", transaction);
//         let txid = await p.sendTxAsync(transaction);
//         console.log("txid ----------->", txid);
//         if (!!txid?.error) {
//             transaction.hash = txid;
//         }
//     });
//     test('send did tx  ################### ', async () => {
//         let didAddress = await p.getDIDAddress();
//         let didAddressHex = didAddressToHex(didAddress)
//         console.log("didAddressHex ----------->", didAddressHex);
//         let transaction: Transaction = { from: didAddressHex, to: didAddressHex, value: 0 };
//         transaction = await p.buildUnsignedTx(transaction, "");
//         console.log("tx unsignTx ----------->", transaction);
//         let unsignData = transaction.unsignData || "";
//         const signature = await p.signTx(unsignData, SIGN_SM_TYPE_MAP.DID_SM.signType);
//         transaction.signature = signature;
//         console.log("tx send Tx ----------->", transaction);
//         const txid = await p.sendTxAsync(transaction);
//         console.log("txid ----------->", txid);
//         if (!!txid?.error) {
//             transaction.hash = txid;
//         }
//     });
// });

// describe('test query account asserts', () => {
//     test('Assert  ################### ', async () => {
//         let assets = await p.getAssets({ contractAddress: "", pageNum: 1, pageSize: 10 });
//         console.log(" assets ----------->", assets);
//         let assetHistory = await p.getAssetTransferHis({ assetId: 944, contractAddress: "0x0f99e56cc174bcbd6d43b7c9b553de990c80e3c7", pageNum: 1, pageSize: 10 });
//         console.log(" assetHistorys ----------->", assetHistory);
//     });
// });
// describe('test subscribe tx', () => {
//     jest.spyOn(global, 'setTimeout');
//     jest.useFakeTimers();
//     test('Subscribe tx ###################', async () => {
//         const wallet = newWalletFromMnemonic(
//             'gauge hole clog property soccer idea cycle stadium utility slice hold chief',
//         );
//         const p = new HyperProvider('ws://192.168.4.196:6066/ws/v1/' + APIKEY, wallet);
//         await p.open();
//         let hash = "0x16f0d104a1eedc8a7cc0c77c83e7bbd0bf4da532270eceee9445e05e902f2170";
//         p.subscribe("tx", hash, (result) => {
//             console.log(result)
//             p.unsubscribe(hash);
//         }, true, undefined, [hash]);
//         p.subscribe("status", "from_extensions", (result) => {
//             console.log(result)
//             if (!result) {
//                 //TODO
//             }
//         }, false, 5000, []);
//         jest.advanceTimersByTime(2000);
//     })
// });
afterAll(async () => {
    // await p.destroy();
    console.log("HyperProvider destroy !! ");
})