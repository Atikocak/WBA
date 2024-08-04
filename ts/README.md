# WBA Builders Cohort

## Developments by using TypeScript

### **Bridge to Turbin3 (prereqs)**

- Learn how to use solana web3 library to create a new keypair
- Use newly generated keypair to request airdrop some SOL devnet tokens
- Make SOL transfers on devnet
- Empty newly generated wallet into my WBA dev wallet
- Interact with WBA enrollment dApp to save my WBA dev wallet address

- **Wallet Generation:** Successfully generated my wallet `H4JnrZA1sWvLkETRwtNmt57Zjcyac74UASSes81qmxAL`.
- **Airdrop Receipt:** [View Transaction](https://explorer.solana.com/tx/53Firh5zWc7HnDkkp6sbW3rbgw91YExuEARVZL6ShvJmwRCRXDfz2rWhdCN2n4KVbSafcfkyMAkSwhdDxnvjRbcD?cluster=devnet)
- **Token Transfer:** [View Transaction](https://explorer.solana.com/tx/vuxY2N8H61Bb3Rurkocm4EdqnctJKhBATpyyPA1wbcJpAt1UCcg8TS5VMr7PWEaBYsm6iLFdk34Vh3vCJW2aVgm?cluster=devnet)
- **Program Enrollment:** [View Transaction](https://explorer.solana.com/tx/5LMSV2N4KQ6VbjZDw9j4gWwRuq4ReXW6yL7n7PdSgaaZdiWmKT8LWTjCehveL1aZpF32LsHu8oij1RjWSZbYNLVF?cluster=devnet)

### **Token Operations (cluster1)**

1. Fungible Tokens

- spl_init.ts -> Create a fungible token
- spl_mint.ts -> Mint some token to your ATA
- spl_metadata.ts -> Create or Update token metadata (token name, icon etc.)
- spl_transfer.ts -> Transfer some token to another ATA

- **Token Generation** [View Transaction](https://explorer.solana.com/tx/3XTLZ7SK6d6ECVB3VSW5w1B9LMdTZ61rNPgmUJ1gM6zxZcpY5szsqhgyfTD3Q6uJVtsPWsvRALnoLtuyGvGChGpu?cluster=devnet)
- **Mint Some Token** [View Transaction](https://explorer.solana.com/tx/4ixAftV44haoWH6az7cqHE9BNHkDG2m6awdDRJ8N4SXqPg7JjfU4a5BeTCgs5nhWkhRXmNvzZmLXptx6uRTpW3C?cluster=devnet)
- **Token Metadata** [View Transaction](https://explorer.solana.com/tx/jhQmV5Sh4ctoWP8DLN5mihqvNmysMsF52KgbuqbyLesKSomwmaet1GJ6SgU4NXd8He81YLaT7cE6AkEYqsuiGxH?cluster=devnet)
- **Transfer Token** [View Transaction](https://explorer.solana.com/tx/2hHkZdEURFbn12NDXeJVE3dugxBgfEKY2NzDsptVMhVqMACsmLtrB7yhp3DNkK49dMu4hJ7ZuxPGpYnywFnjbsLV?cluster=devnet)

2. Non-Fungible Tokens

- nft_image.ts -> Upload image file(s) to Arweave to get base URI
- nft_metadata.ts -> Upload metadata as JSON
- nft_mint.ts -> Mint NFT to the ATA

- **Mint NFT** [View Transaction](https://explorer.solana.com/tx/8hoVm4cpGaB5VHGXki3pDHWudUF9hZZpJwj66J7Zs5gMcEC559mvnrCsGZQvBP5SLHhyXz5oeBsSKKLwexyS1Jb?cluster=devnet)

3. Vault Operations

- vault_init.ts -> ...
