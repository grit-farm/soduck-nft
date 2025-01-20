import NftMintBox from "@/components/feature/nft/nft-mint-box";
import ScreenContainer from "@/components/ui/screen-container";
import NftImage from "@/components/feature/nft/nft-image";
import FlowerEffect from "@/components/feature/common/flower-effect";

export default function NftPage() {
  return (
    <ScreenContainer>
      <FlowerEffect />
      <section className="mx-auto flex flex-col md:flex-row max-w-7xl h-screen gap-4 p-8 md:p-0">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <NftImage />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <NftMintBox />
        </div>
      </section>
    </ScreenContainer>
  );
}
