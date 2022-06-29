import { newWalletFromPrivateKey, newWalletFromMnemonic, SIGN_SM_TYPE_MAP } from '../index';
test('My Wallet', () => {
  const msg = "from=0x6469643a6870633a526564436176653a57616c6c65745465737439313831633462656163383936653437326466336233373366393430613539363634373834633766&to=0x6469643a6870633a526564436176653a57616c6c65745465737439313831633462656163383936653437326466336233373366393430613539363634373834633766&value=0x0&payload=0x7b2264696441646472657373223a226469643a6870633a526564436176653a57616c6c65745465737439313831633462656163383936653437326466336233373366393430613539363634373834633766222c227374617465223a302c227075626c69634b6579223a7b2274797065223a22736d32222c226b6579223a224244666a314a6e6237715a6146506c613978654342724f7367397248443644713330396d703472786c436553715a66467a64346c71334b686f514863585547452f39466b34686d78593672626d704748542b2b54436e4d3d227d2c2261646d696e73223a5b226469643a6870633a526564436176653a6170706f72225d7d&timestamp=0x16fc70625d106bdc&nonce=0x1895c357d550e2&opcode=c8&extra=&vmtype=TRANSFER&version=3.2&extraid=&cname=";
  // let wallet1 = newWalletFromPrivateKey('5d1c8c8d5cb3d046d72feebd4877ec85d3514206a9efa14223d9b007c7c1820a');
  // let sig1 = wallet1.sign(msg);
  // let wallet2 = newWalletFromMnemonic('fuel obey this magnet inch dream build provide ensure sock trust umbrella');
  // console.log("wallet publicKey ----------->", wallet2.getPublicKey());
  // console.log("wallet public key X ----------->", wallet2.keyPair.getPublic().getX().toString("hex"));
  // console.log("wallet public key Y ----------->", wallet2.keyPair.getPublic().getY().toString("hex"));
  // console.log("wallet privateKey ----------->", wallet2.keyPair.getPrivate("hex"));
  // console.log("wallet sign msg ----------->", msg);

  // let sigsm2 = wallet2.sign(msg, SIGN_SM_TYPE_MAP.DEFAULT_SM.signType);
  // console.log("wallet signature sm2 ----------->", sigsm2);
  // console.log("wallet verify sign ----------->", wallet2.verify(msg, sigsm2));
  // let sigsm2account = wallet2.sign(msg, SIGN_SM_TYPE_MAP.ACCOUNT_SM.signType);
  // console.log("wallet signature account sm2 ----------->", sigsm2account);
 
  // console.log("wallet signature account sm2 ----------->",  Buffer.from(msg, "utf8").toString("hex"));
  // let sigsm2did = wallet2.sign(Buffer.from(msg, "utf8").toString("hex"), SIGN_SM_TYPE_MAP.DID_SM.signType);
  // console.log("wallet signature did sm2 ----------->", sigsm2did);
  // let identityUtf8 = "did:hpc:RedCave:WalletTestca7dc3d8301d147d27172c9c4d7dd1cb41d7560c|钱怡紫|420101198005198949|13708570704|1655973440461";
  // let identityHex = Buffer.from(identityUtf8, "utf8").toString("hex");
  // console.log("wallet identity ----------->", identityHex);
  // let identitySign = wallet2.sign(identityHex);
  // console.log("wallet identitySign ----------->", identitySign);
});
