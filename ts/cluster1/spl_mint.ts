import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Commitment, Connection, Keypair, PublicKey } from "@solana/web3.js";
import wallet from "./wallet/wba-wallet.json";

// You have your mint account (obtained from spl_init.ts), now you want to mint some tokens to your wallet

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

/* 
The n suffix at the end of the number 1_000_000 indicates that this is a BigInt. 
The underscores (_) are used as a separator for readability, and they don't affect the value. This makes it easier to read large numbers.
*/
const token_decimals = 1_000_000n;

// Mint address of the token you want to mint
const mint = new PublicKey("HnQTLniM4AHkmqnZ6mQqm577ymEowRrHjKt4JZ9fSQk");

(async () => {
  try {
    // TODO: play with different commitment levels. What happens in each different commitment level when we pass as a parameter?
    // Create an ATA (associated token account). This token account will be associated with my wallet account.
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    console.log(`Your ata is: ${ata.address.toBase58()}`);

    // Mint to ATA that we just created
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair.publicKey,
      100_000n * token_decimals
    );
    console.log(`Your mint txid: ${mintTx}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
