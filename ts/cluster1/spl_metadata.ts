import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "./wallet/wba-wallet.json";

// Define our Mint address
const mint = publicKey("HnQTLniM4AHkmqnZ6mQqm577ymEowRrHjKt4JZ9fSQk");

// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here
    // Accounts for creating the metadata account
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint: mint,
      mintAuthority: signer,
      updateAuthority: signer,
    };

    // Data for the metadata account. This will be used in the token metadata
    let data: DataV2Args = {
      name: "Atibaba WBA Token",
      symbol: "ATI",
      uri: "https://arweave.net/dFVGnY1iylQ8roZyecyFvI8GTeQknlfVaK2m0Xw17Ic",
      sellerFeeBasisPoints: 0,
      creators: null, // Used for NFTs
      collection: null, // Used for NFTs
      uses: null, // Used for NFTs
    };

    // Args for creating the metadata account
    let args: CreateMetadataAccountV3InstructionArgs = {
      data: data,
      isMutable: true,
      collectionDetails: null,
    };

    // Create the metadata account
    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    // Args for updating the metadata account
    // let args: UpdateMetadataAccountV2InstructionArgs = {
    //     ???
    // };

    // Update the metadata account
    // let tx = updateMetadataAccountV2(
    // );

    let result = await tx.sendAndConfirm(umi);
    console.log(bs58.encode(result.signature));
    console.log(
      `Success! Metadata created at https://explorer.solana.com/address/${result.signature}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

/* 
    NOTE: If you got this error when you run yarn spl_metadata, then the reason might be you are running the code second time. Try to update metadata instead of create.

    Oops, something went wrong: Error: Simulation failed. 
    Message: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x0.
    Logs:
    [
        "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [1]",
        "Program log: IX: Create Metadata Accounts v3",
        "Program 11111111111111111111111111111111 invoke [2]",
        "Program 11111111111111111111111111111111 success",
        "Program log: Allocate space for the account",
        "Program 11111111111111111111111111111111 invoke [2]",
        "Allocate: account Address { address: J5LjLFxQnVKQwSse6SCKDp1LnMqnbHeyNvs4wFQjMz5f, base: None } already in use",
        "Program 11111111111111111111111111111111 failed: custom program error: 0x0",
        "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 17353 of 200000 compute units",
        "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s failed: custom program error: 0x0"
    ].

*/

// region: Note to Self
/*
Here we create metadata account for our token to be minted.

       let metadata: DataV2Args = {
            name: "Your Token Name",
            symbol: "SYM",
            uri: "https://your-token-uri.com",
            sellerFeeBasisPoints: 500,
            creators: [
                {
                    address: signer.publicKey,
                    verified: true,
                    share: 100
                }
            ], // (optional)
            collection: null, // which collection this token will be belong to(used for NFTs). (optional) 
            uses: null // how many times the token can be used. for assets with limited use. (optional)
        };


    // collection object looks like:
    collection: {
        key: publicKey("<collection public key>"), // Replace with your collection public key
        verified: false // Set to true if the collection is verified
    }

    // uses object looks like:
      uses: {
        useMethod: "Single", // Method of use
        remaining: 10, // Remaining uses
        total: 10 // Total uses
    }

    // uri in metadata is for additional metadata. It points to the json file allows you to store extensive metadata about the token in a centralized location(a server, IPFS, or Arweave). 
    This way, you are not limited by the on-chain storage limitations and costs.
    
*/
// endregion Note to Self
