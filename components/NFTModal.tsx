"use client";

import { motion, AnimatePresence } from "framer-motion";
import { NFTDisplayData } from "@/lib/types";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";

interface NFTModalProps {
  nft: NFTDisplayData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NFTModal({ nft, isOpen, onClose }: NFTModalProps) {
  if (!isOpen || !nft) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2, type: "spring", damping: 25, stiffness: 300 }}
          className="bg-surface border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row hide-scrollbar"
        >
          {/* Left: Image */}
          <div className="w-full md:w-1/2 bg-black/50 relative aspect-square md:aspect-auto">
            <Image
              src={nft.imageUrl}
              alt={nft.name}
              fill
              className="object-contain md:object-cover"
              unoptimized
            />
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/10 rounded-full text-muted hover:text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 pr-8">
              <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
                {nft.collectionName}
              </h4>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">
                {nft.name}
              </h2>
              <p className="font-mono text-xs text-muted">
                Token ID: {nft.tokenId}
              </p>
            </div>

            <div className="mb-6 flex-1">
              <h3 className="text-white font-heading font-semibold mb-2">Description</h3>
              <p className="text-muted text-sm leading-relaxed max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                {nft.description || "No description provided."}
              </p>
            </div>

            {nft.traits && nft.traits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-white font-heading font-semibold mb-3">Attributes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {nft.traits.map((trait, idx) => (
                    <div key={idx} className="bg-black/50 border border-white/10 rounded-lg p-3 flex flex-col gap-1 items-center text-center justify-center">
                      <span className="font-mono text-[10px] text-muted uppercase tracking-wider truncate w-full">
                        {trait.traitType}
                      </span>
                      <span className="font-mono text-sm text-white truncate w-full" title={String(trait.value)}>
                        {trait.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-white/10">
              <a
                href={`https://opensea.io/assets/ethereum/${nft.contractAddress}/${nft.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors font-heading font-semibold"
              >
                <span>View on OpenSea</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
