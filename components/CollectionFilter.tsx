"use client";

import { motion } from "framer-motion";

interface CollectionFilterProps {
  collections: string[];
  activeCollection: string | null;
  onSelect: (collection: string | null) => void;
}

export default function CollectionFilter({ collections, activeCollection, onSelect }: CollectionFilterProps) {
  if (collections.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-wrap gap-2 py-4 overflow-x-auto hide-scrollbar">
      <button
        onClick={() => onSelect(null)}
        className={`whitespace-nowrap rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
          activeCollection === null
            ? "bg-primary/20 border border-primary/50 text-primary"
            : "bg-white/5 border border-white/10 text-muted hover:border-white/30 hover:text-white"
        }`}
      >
        ALL
      </button>
      {collections.map((col) => (
        <button
          key={col}
          onClick={() => onSelect(col)}
          className={`whitespace-nowrap rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
            activeCollection === col
              ? "bg-primary/20 border border-primary/50 text-primary"
              : "bg-white/5 border border-white/10 text-muted hover:border-white/30 hover:text-white"
          }`}
        >
          {col}
        </button>
      ))}
    </div>
  );
}
