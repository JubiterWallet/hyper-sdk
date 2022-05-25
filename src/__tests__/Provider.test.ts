import { HyperProvider, newWalletFromMnemonic, Transaction, PayloadParams } from '../index';
import { didAddressToHex } from '../wallet';

test('My Provider', async () => {
    //   const wallet = newWalletFromMnemonic(
    //     'gauge hole clog property soccer idea cycle stadium utility slice hold chief',
    //   );
    //   const p = new HyperProvider('ws://192.168.4.196:6066/ws/v1/1111111', wallet);
    //   await p.open();
    //   const address = await p.getAddress();
    //   console.log("address ----------->", address);
    //   // await p.getAddress();
    //   // const balance = await p.getBalance([address]);
    //   // console.log("balance ----------->", balance);
    //   const transaction: Transaction = { from: "0x" + address, to: "0xf95fec9c556906cb417663c5db8c566523fe631a", value: 0 };
    //   const raw = await p.buildUnsignedTx(transaction, "");
    //   console.log("tx raw ----------->", raw);
    //   // transaction.hex = raw;
    //   // const signature = await p.signTx(raw);
    //   // transaction.signature = signature;
    //   // console.log("signature ----------->", signature);
    //   // console.log("transaction ----------->",transaction);
    //   // const txid = await p.broadcastTx(transaction);
    //   // console.log("txid ----------->", txid);
    //   // await p.destroy();
});

// jest.spyOn(global, 'setTimeout');
// jest.useFakeTimers();
// test('Provider subscribe tx ', async () => {
//   const wallet = newWalletFromMnemonic(
//     'gauge hole clog property soccer idea cycle stadium utility slice hold chief',
//   );
//   const p = new HyperProvider('ws://192.168.4.196:6066/ws/v1/1111111', wallet);
//   await p.open();
//   // await p.getAddress();
//   let hash = "0x16f0d104a1eedc8a7cc0c77c83e7bbd0bf4da532270eceee9445e05e902f2170";
//   p.subscribe("tx", hash , (result) => {
//     console.log(result)
//     expect(result[0]?.hash).toEqual('0x16f0d104a1eedc8a7cc0c77c83e7bbd0bf4da532270eceee9445e05e902f2170');
//     p.unsubscribe(hash);
//   }, true,[hash]);
//   jest.advanceTimersByTime(2000);
// })

// test('Provider buildContractPayload  ', async () => {
//   const wallet = newWalletFromMnemonic(
//     'gauge hole clog property soccer idea cycle stadium utility slice hold chief',
//   );
//   const p = new HyperProvider('ws://192.168.4.196:6066/ws/v1/1111111', wallet);
//   await p.open();
//   //  const address = await p.getAddress();
//   let payloadParams: PayloadParams =
//   {
//     methodName: "TestBool(bool,string)",
//     abi: "[{ 'constant': false, 'inputs': [{ 'name': 'a', 'type': 'bool' }, { 'name': 'b', 'type': 'string' }], 'name': 'TestBool', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }]",
//     params: [true, "test"],
//   };
//   let payload = await p.buildContractPayload(payloadParams)
//   console.log("payload ----------->", payload);
//   expect(payload).toEqual("0xac9023630000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000")
// })

test('Provider registerDid  ', async () => {
    const wallet = newWalletFromMnemonic(
        'gauge hole clog property soccer idea cycle stadium utility slice hold chief',
    );
    const p = new HyperProvider('ws://192.168.4.196:6066/ws/v1/1111111', wallet);
    await p.open();
    let hash = await p.registerDID();
    console.log("registerDid hash ----------->", hash);
    let didAddress = await p.getDIDAddress();
    console.log("didAddress----------->", didAddress);
    console.log("didAddressToHex----------->", didAddressToHex(didAddress));
    await p.destroy();
    // expect(payload).toEqual("0xac9023630000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000")
})