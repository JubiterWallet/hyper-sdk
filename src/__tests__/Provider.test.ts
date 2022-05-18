import { HyperProvider,newWalletFromMnemonic,Transaction } from '../index';
test('My Provider', async () => {
  const wallet = newWalletFromMnemonic(
    'gauge hole clog property soccer idea cycle stadium utility slice hold chief',
  );
  const p = new HyperProvider('ws://192.168.4.196:6066/ws/v1/1111111',wallet);
  await p.open();
  const address = await p.getAddress();
  console.log("address ----------->",address);
  await p.getAddress();
  const balance = await p.getBalance([address]);
  console.log("balance ----------->",balance);
  const transaction: Transaction={from:"0x"+address,to:"0xf95fec9c556906cb417663c5db8c566523fe631a",value:0};
  const raw = await p.buildUnsignedTx(transaction,"");
  console.log("tx raw ----------->",raw);
  transaction.hex = raw;
  const signature = await p.signTx(raw);
  transaction.signature = signature;
  console.log("signature ----------->",signature);
  // console.log("transaction ----------->",transaction);
  const txid = await p.broadcastTx(transaction);
  console.log("txid ----------->",txid);
  // p.subscribe("tx",txid,(e)=>{console.log(e);},true);
  // await p.destroy();
});
