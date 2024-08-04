import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import wallet from "./wallet/wba-wallet.json";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    const imageUri =
      "https://arweave.net/c0wfp9hhqepAXgNr_D0ePfkY_hbctXBRMddlfrC_tcU"; // Image URI obtained from nft_image.ts
    const metadata = {
      name: "Bored Ape Pixel Club",
      symbol: "BAPC", // Max 3 characters
      description:
        "Bored Ape Pixel Club is a collection of 10,000 unique Bored Ape NFTs.",
      image: imageUri,
      attributes: [
        { trait_type: "hat", value: "comrade" },
        { trait_type: "shirt", value: "blue hoodie" },
        { trait_type: "fur", value: "red" },
        { trait_type: "accessories", value: "earrings" },
        { trait_type: "background", value: "citizen" },
        { trait_type: "eyes", value: "curious" },
        { trait_type: "mouth", value: "default" },
      ],
      properties: {
        files: [
          {
            type: "image/png",
            uri: imageUri,
          },
        ],
      },
      creators: ["H4JnrZA1sWvLkETRwtNmt57Zjcyac74UASSes81qmxAL"], // Array of public keys
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();

// region: Note to Self
/*
Here we are uploading our whole metadata with the image to Arweave by using irysUploader.

The result Uri of metadata is :  https://arweave.net/e4VmOQVD4mVOrp58MA0Y3kKbCotYUFwhyvuh99eLHAQ
*/
// endregion: Note to Self
