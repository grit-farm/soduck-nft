// https://docs.story.foundation/docs/register-an-ip-asset
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { Account, Address, http, toHex, zeroAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";

async function createNFTCollection() {
  const RPCProviderUrl =
    process.env.RPC_PROVIDER_URL || "https://rpc.odyssey.storyrpc.io";

  // !보안! 로컬에서만 설정해서 사용하기
  const privateKey: Address = `0x${process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY}`;
  const account: Account = privateKeyToAccount(privateKey);
  const config: StoryConfig = {
    account: account,
    transport: http(RPCProviderUrl),
    chainId: "odyssey",
  };
  const client = StoryClient.newClient(config);

  const newCollection = await client.nftClient.createNFTCollection({
    name: "Test NFT",
    symbol: "TEST",
    isPublicMinting: true,
    mintOpen: true,
    mintFeeRecipient: zeroAddress,
    contractURI: "",
    txOptions: { waitForTransaction: true },
  });

  const response = await client.ipAsset.mintAndRegisterIp({
    // an NFT contract address created by the SPG
    spgNftContract: newCollection.spgNftContract as Address,
    // https://docs.story.foundation/docs/ip-asset#adding-nft--ip-metadata-to-ip-asset
    ipMetadata: {
      ipMetadataURI: "test-uri",
      ipMetadataHash: toHex("test-metadata-hash", { size: 32 }),
      nftMetadataHash: toHex("test-nft-metadata-hash", { size: 32 }),
      nftMetadataURI: "test-nft-uri",
    },
    txOptions: { waitForTransaction: true },
  });

  console.log(
    `Completed at transaction hash ${response.txHash}, NFT Token ID: ${response.tokenId}, IPA ID: ${response.ipId}`
  );
}

export default createNFTCollection;
