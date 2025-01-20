"use client";

import { Button } from "@/components/ui/button";
import { NFTContractAddress, RPCProviderUrl } from "@/lib/story/constant";
import { defaultNftContractAbi } from "@/lib/story/defaultNftContractAbi";
import { IpMetadata, StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import {
  http,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const NftMintBox = () => {
  const { address } = useAccount();
  const { data: hash, writeContractAsync } = useWriteContract();
  const { data: tx } = useWaitForTransactionReceipt({
    hash: hash,
  });

  const mintNft = async () => {
    const config: StoryConfig = {
      account: address,
      transport: http(RPCProviderUrl),
      chainId: "odyssey",
    };
    const client = StoryClient.newClient(config);

    // 1. Set up IP Metadata
    const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
      title: "Soduck Asset",
      description: "Novel agent soduck represents ownership of an IP Asset",
      attributes: [
        {
          key: "Rarity",
          value: "None",
        },
      ],
    });

    // 2. Set up NFT meatadata
    const nftMetadata = {
      name: "Soduck of IP Asset",
      Description: "Novel agent soduck represents ownership of an IP Asset",
      // TODO: 이미지 넣기
      image: "",
    };

    //  3. Upload your IP and NFT metadata to IPFS
    // const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
    // const ipHash = createHash("sha256")
    //   .update(JSON.stringify(ipMetadata))
    //   .digest("hex");
    // const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
    // const nftHash = createHash("sha256")
    //   .update(JSON.stringify(nftMetadata))
    //   .digest("hex");

    // 4. Mint an NFT
    writeContractAsync({
      address: NFTContractAddress,
      functionName: "mintNFT",
      args: [address, `https://ipfs.io/ipfs/${1}`],
      abi: defaultNftContractAbi,
    });
    const tokenId = tx?.logs?.[0]?.topics?.[3]
      ? parseInt(tx.logs[0].topics[3], 16)
      : undefined;
    if (!tokenId) throw new Error("토큰 ID를 가져오는데 실패했습니다");
    console.log(tokenId);

    // 5. Register an IP Asset
    const response = await client.ipAsset.registerIpAndAttachPilTerms({
      nftContract: NFTContractAddress,
      tokenId: tokenId!,
      terms: [],
      ipMetadata: {
        // ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
        // ipMetadataHash: `0x${ipHash}`,
        // nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
        // nftMetadataHash: `0x${nftHash}`,
      },
      txOptions: { waitForTransaction: true },
    });

    return response;
  };

  return (
    <Card className="w-full">
      <CardHeader></CardHeader>
      <CardContent>
        <div className="my-4 text-2xl">
          <span>1,000 Minted</span>
        </div>
        <h3 className="text-5xl font-bold">Soduck NFT</h3>
        <p className="my-4 text-gray-500">Novel Agent with story protocol</p>
        <Button className="w-full" onClick={mintNft} disabled={!address}>
          {address ? "Mint NFT" : "Connect wallet"}
        </Button>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default NftMintBox;
