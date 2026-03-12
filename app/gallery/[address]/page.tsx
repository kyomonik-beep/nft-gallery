"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import WalletSearch from "@/components/WalletSearch";
import PortfolioStats from "@/components/PortfolioStats";
import CollectionFilter from "@/components/CollectionFilter";
import NFTGrid from "@/components/NFTGrid";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { NftResponse } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

export default function GalleryPage() {
  const params = useParams();
  const address = params.address as string;
  const router = useRouter();
  
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const { data: ethPriceData } = useQuery({
    queryKey: ["ethPrice"],
    queryFn: async () => {
      const res = await fetch("/api/eth-price");
      return res.json();
    },
    staleTime: 60000,
  });

  const { data: nftData, isLoading, isError, error } = useQuery<NftResponse>({
    queryKey: ["nfts", address],
    queryFn: async () => {
      const res = await fetch(`/api/nfts/${address}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to fetch gallery");
      }
      return res.json();
    },
    retry: 1,
    staleTime: 300000,
  });

  const nfts = nftData?.nfts || [];
  
  // Calculate unique collections
  const collections = Array.from(new Set(nfts.map(nft => nft.collectionName))).filter(Boolean).sort();
  
  // Filter NFTs by collection
  const filteredNfts = activeCollection 
    ? nfts.filter(nft => nft.collectionName === activeCollection)
    : nfts;

  // Calculate est value (basic floor price sum)
  const estValueEth = nfts.reduce((sum, nft) => sum + (nft.floorPrice || 0), 0);

  return (
    <div className="min-h-screen pb-12 relative">
      {/* Header Sticky nav */}
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-white/10 w-full py-4 px-4 md:px-8 flex flex-col md:flex-row items-center gap-4 justify-between transition-all">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-muted hover:text-white transition-colors font-mono text-sm shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>
        <div className="w-full max-w-md">
          <WalletSearch />
        </div>
      </header>

      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <div className="w-full py-32 flex flex-col items-center justify-center px-4">
           <div className="w-24 h-24 mb-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 text-4xl shadow-[0_0_50px_-10px_rgba(239,68,68,0.3)]">
             ⚠️
           </div>
           <h2 className="font-heading text-2xl text-white font-bold mb-2">Error Loading Gallery</h2>
           <p className="text-muted max-w-md text-center font-mono text-sm">
             {(error as Error)?.message || "Ensure the address is valid and the Alchemy API key is set."}
           </p>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <PortfolioStats 
            address={nftData?.address || address}
            totalNfts={nftData?.totalCount || nfts.length}
            collectionsCount={collections.length}
            estValueEth={estValueEth}
            ethPriceUsd={ethPriceData?.price || 0}
          />
          
          <CollectionFilter 
            collections={collections}
            activeCollection={activeCollection}
            onSelect={setActiveCollection}
          />
          
          <NFTGrid nfts={filteredNfts} />
        </div>
      )}
    </div>
  );
}
