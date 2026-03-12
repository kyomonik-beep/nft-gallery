"use client";

import { formatEth, formatUsd, formatAddress } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface PortfolioStatsProps {
  address: string;
  totalNfts: number;
  collectionsCount: number;
  estValueEth: number;
  ethPriceUsd: number;
}

export default function PortfolioStats({ address, totalNfts, collectionsCount, estValueEth, ethPriceUsd }: PortfolioStatsProps) {
  const [copied, setCopied] = useState(false);
  const estValueUsd = estValueEth * ethPriceUsd;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-surface border-y border-border px-4 py-6 mb-6 relative overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/20 blur-[80px] rounded-full -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-accent/20 blur-[80px] rounded-full -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-between z-10 relative">
        <div className="flex items-center gap-4">
          <div className="relative flex h-3 w-3 items-center justify-center">
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></div>
            <div className="relative inline-flex rounded-full h-2 w-2 bg-primary"></div>
          </div>
          <div>
            <h2 className="font-heading font-semibold text-white tracking-wide text-lg">PORTFOLIO</h2>
            <div className="flex items-center gap-2 text-muted font-mono text-sm mt-1">
              <span>{formatAddress(address)}</span>
              <button onClick={handleCopy} className="hover:text-white transition-colors">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 md:gap-12">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-mono uppercase tracking-widest mb-1">Total NFTs</span>
            <span className="font-mono text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
              {totalNfts}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-muted text-xs font-mono uppercase tracking-widest mb-1">Collections</span>
            <span className="font-mono text-2xl text-white font-bold">
              {collectionsCount}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-muted text-xs font-mono uppercase tracking-widest mb-1">Est. Value</span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                {formatEth(estValueEth)}
              </span>
              <span className="font-mono text-sm text-muted">
                ({formatUsd(estValueUsd)})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
