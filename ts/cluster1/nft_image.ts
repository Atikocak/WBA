import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";
import wallet from "./wallet/wba-wallet.json";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    //1. Load image
    const image = await readFile("/home/ati/MyProjects/BAPC.png");

    //2. Convert image to generic file.
    const genericFile = createGenericFile(image, "BAPC", {
      contentType: "image/png",
    });

    //3. Upload image
    const [myUri] = await umi.uploader.upload([genericFile]);

    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();

// region: Note to Self
/*
Here we are uploading our nft image to Arweave by using irysUploader.

The result Uri of my image is :  https://arweave.net/c0wfp9hhqepAXgNr_D0ePfkY_hbctXBRMddlfrC_tcU
*/
// endregion: Note to Self
