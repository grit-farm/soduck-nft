"use server";

import { PinataSDK } from "pinata-web3";

export async function uploadJSONToIPFS(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("file") as File;

  const data = new FormData();
  data.append("file", imageFile);
  const pinFileRes = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: data,
    }
  );
  const { IpfsHash: ImageIpfsHash } = await pinFileRes.json();

  const pinata = new PinataSDK({ pinataJwt: process.env.PINATA_JWT });
  const json = {
    name,
    description,
    image: `https://ipfs.io/ipfs/${ImageIpfsHash}`,
  };
  const { IpfsHash: JsonIpfsHash } = await pinata.upload.json(json);
  return { ipfsUri: `https://ipfs.io/ipfs/${JsonIpfsHash}`, ipfsJson: json };
}
