import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import base58 from "bs58";
import wallet from "./wallet/wba-wallet.json";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi); // Nft Signer
const metadataUri =
  "https://arweave.net/e4VmOQVD4mVOrp58MA0Y3kKbCotYUFwhyvuh99eLHAQ"; // Metadata URI obtained from nft_metadata.ts

(async () => {
  // Create NFT
  let tx = createNft(umi, {
    mint: mint,
    name: "Bored Ape Pixel Club",
    uri: metadataUri,
    sellerFeeBasisPoints: percentAmount(5), // %5 Fee
  }); // Why do we pass name of the nft here? It is already indicated in metadata URI? Because they are present only on attribute tab; not on the main page

  let result = await tx.sendAndConfirm(umi);
  const signature = base58.encode(result.signature);

  console.log(
    `Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );

  console.log("Mint Address: ", mint.publicKey);
})();

// region: Note to Self
/*
Here we minted NFT to this account 99okmxtjGCLfhCyRN8W4jPPWftYMs5TJ26qyFc5VsrhC. Creator is assigned automatically
and that is my keypair's public key. 

Mint transaction:
https://explorer.solana.com/tx/8hoVm4cpGaB5VHGXki3pDHWudUF9hZZpJwj66J7Zs5gMcEC559mvnrCsGZQvBP5SLHhyXz5oeBsSKKLwexyS1Jb?cluster=devnet
*/
// endregion: Note to Self
