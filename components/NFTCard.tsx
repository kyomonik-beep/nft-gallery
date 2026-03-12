"use client";

import { NFTDisplayData } from "@/lib/types";
import { motion } from "framer-motion";
import { formatEth } from "@/lib/utils";
import Image from "next/image";

interface NFTCardProps {
  nft: NFTDisplayData;
  index: number;
  onClick: (nft: NFTDisplayData) => void;
}

export default function NFTCard({ nft, index, onClick }: NFTCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut" 
      }}
      onClick={() => onClick(nft)}
      className="group cursor-pointer bg-surface border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.4)] transition-all duration-300 relative aspect-[3/4] flex flex-col"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-black/50">
        <Image
          src={nft.imageUrl}
          alt={nft.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-300"
          unoptimized={nft.imageUrl.endsWith(".gif") || nft.imageUrl.includes("ipfs")} // Keep simple for external images
        />
        
        {nft.floorPrice && (
          <div className="absolute top-2 right-2 bg-secondary/20 backdrop-blur-md border border-secondary/50 rounded-lg px-2 py-1 font-mono text-xs text-primary z-10">
            {formatEth(nft.floorPrice)}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-1 z-10 bg-surface">
        <div>
          <h4 className="font-mono text-[10px] text-primary uppercase tracking-widest truncate mb-1">
            {nft.collectionName}
          </h4>
          <h3 className="font-heading font-semibold text-white text-base leading-tight truncate">
            {nft.name}
          </h3>
        </div>
        <div className="font-mono text-[10px] text-muted truncate">
          ID: {nft.tokenId.length > 20 ? `${nft.tokenId.slice(0, 10)}...` : nft.tokenId}
        </div>
      </div>
    </motion.div>
  );
}
