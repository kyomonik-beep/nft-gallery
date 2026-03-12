"use client";

import { useState } from "react";
import NFTCard from "./NFTCard";
import NFTModal from "./NFTModal";
import { NFTDisplayData } from "@/lib/types";

interface NFTGridProps {
  nfts: NFTDisplayData[];
}

export default function NFTGrid({ nfts }: NFTGridProps) {
  const [selectedNft, setSelectedNft] = useState<NFTDisplayData | null>(null);

  if (!nfts || nfts.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 mb-6 rounded-full bg-surface border border-white/10 flex items-center justify-center relative shadow-[0_0_50px_-10px_rgba(247,147,26,0.3)]">
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping"></div>
          <span className="text-4xl">📭</span>
        </div>
        <h3 className="font-heading text-2xl font-bold text-white mb-2">No NFTs Found</h3>
        <p className="text-muted font-mono text-sm max-w-md">
          This address currently holds no NFTs or we couldn't fetch them.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mt-6">
        {nfts.map((nft, index) => (
          <NFTCard
            key={`${nft.contractAddress}-${nft.tokenId}-${index}`}
            nft={nft}
            index={index}
            onClick={(n) => setSelectedNft(n)}
          />
        ))}
      </div>

      {selectedNft && (
        <NFTModal
          nft={selectedNft}
          isOpen={!!selectedNft}
          onClose={() => setSelectedNft(null)}
        />
      )}
    </div>
  );
}
