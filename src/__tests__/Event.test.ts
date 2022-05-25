import { HyperTxEvent, HyperProvider, newWalletFromMnemonic } from "../index";
jest.spyOn(global, 'setTimeout');
jest.useFakeTimers();
test('My Transaction Event', async () => {
    // const wallet = newWalletFromMnemonic(
    //     'gauge hole clog property soccer idea cycle stadium utility slice hold chief',
    // );
    // let p = new HyperProvider('ws://192.168.4.196:6066/ws/v1/1111111', wallet);
    // await p.open();
    // let hash = "0x16f0d104a1eedc8a7cc0c77c83e7bbd0bf4da532270eceee9445e05e902f2170";
    // // let address = await p.getAddress();
    // let event = new HyperTxEvent(
    //     'tx',
    //     hash,
    //     (value) => {
    //         console.log(value);
    //         expect(value[0]?.hash).toEqual('0x16f0d104a1eedc8a7cc0c77c83e7bbd0bf4da532270eceee9445e05e902f2170');
    //     },
    //     true,
    //     p
    // );
    // event.on("0x16f0d104a1eedc8a7cc0c77c83e7bbd0bf4da532270eceee9445e05e902f2170");
    // jest.advanceTimersByTime(2000);
});

