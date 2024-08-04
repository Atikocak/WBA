import { createMint } from "@solana/spl-token";
import { Commitment, Connection, Keypair } from "@solana/web3.js";
import wallet from "./wallet/wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    // Start here
    // Create mint account. createMint function returns Public key of the mint account.
    const mint = await createMint(
      connection,
      keypair,
      keypair.publicKey,
      null,
      6
    );
    // We need the public key of that mint account in order to mint from it, so we write it to the console.
    console.log(`Success! Token minted at ${mint}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();

// Token mint address = "HnQTLniM4AHkmqnZ6mQqm577ymEowRrHjKt4JZ9fSQk"

// region : Note to Self
/*
Here we create a mint account. After this we will mint tokens to a token account in spl_mint.ts

    Mint account has data about token like the total amount, authority etc. mint authority being me means only I can mint that token, 
    my wallet as the authority.
*/
// endregion : Note to Self
