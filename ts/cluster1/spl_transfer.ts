import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { Commitment, Connection, Keypair, PublicKey } from "@solana/web3.js";
import wallet from "./wallet/wba-wallet.json";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("HnQTLniM4AHkmqnZ6mQqm577ymEowRrHjKt4JZ9fSQk");

// Recipient address
const to = new PublicKey("BvhV49WPYBbzPu8Fpy8YnPnwhNWLbm9Vmdj2T5bNSotS"); // Leo's account

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    let fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    let toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );

    // Transfer the new token to the "toTokenAccount" we just created
    let tx = await transfer(
      connection,
      keypair,
      fromTokenAccount.address,
      toTokenAccount.address,
      keypair.publicKey,
      100n * 1_000_000n // you can write 1e6 here
    );
    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${tx}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

// region: Note to Self
/*
Here we transfer the token we have created to another wallet. If this wallet has no token account for our token, 
we create a token account in his wallet and send token there.

When you look at the transaction hash, you will not see recipient's wallet public key but instead, 
you will see the (associated)token account created on recipient's wallet. You will also not see sender's 
wallet address; you will see its ata public key instead.
*/
// endregion: Note to Self
