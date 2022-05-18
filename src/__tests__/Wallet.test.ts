import { newWalletFromPrivateKey,newWalletFromMnemonic } from '../index';
test('My Wallet', () => {
  const msg = "aabbccdd";
  // const wallet1 = newWalletFromPrivateKey('5d1c8c8d5cb3d046d72feebd4877ec85d3514206a9efa14223d9b007c7c1820a');
  // const sig1 = wallet1.sign(msg);
  const wallet2 = newWalletFromMnemonic('gauge hole clog property soccer idea cycle stadium utility slice hold chief');
  console.log("address ----------->",wallet2.getPublicKey());
  console.log("msg ----------->",msg);
  const sig2 = wallet2.sign(msg);
  console.log("signature ----------->",sig2);
});
