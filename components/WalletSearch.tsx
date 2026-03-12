"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, AlertCircle, Loader2 } from "lucide-react";
import { formatAddress } from "@/lib/utils";
import { motion } from "framer-motion";

export default function WalletSearch() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveSearch = (address: string) => {
    const newSearches = [address, ...recentSearches.filter(a => a !== address)].slice(0, 5);
    setRecentSearches(newSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newSearches));
  };

  const handleSearch = async (e?: React.FormEvent, searchVal?: string) => {
    if (e) e.preventDefault();
    const val = searchVal || input.trim();
    if (!val) return;

    setIsLoading(true);
    setError("");

    try {
      // Basic check, actual validation happens on API or deeper
      if (!val.endsWith(".eth") && val.length < 42) {
        setError("Invalid Ethereum address or ENS name");
        setIsLoading(false);
        return;
      }
      
      saveSearch(val);
      router.push(`/gallery/${val}`);
    } catch (err) {
      setError("Failed to resolve address");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <form onSubmit={(e) => handleSearch(e)} className="relative w-full group flex flex-col gap-2">
        <div className="relative w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search 0x... or ENS (e.g., vitalik.eth)"
            className="w-full bg-black/50 border-b-2 border-border text-foreground px-6 py-4 text-lg md:text-xl font-mono focus:outline-none focus:border-primary focus:shadow-[0_4px_30px_-10px_rgba(247,147,26,0.3)] transition-all rounded-t-lg placeholder:text-muted pr-16"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-accent transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
          </button>
        </div>
      </form>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex items-center gap-2 text-secondary mt-3 font-mono text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}

      {recentSearches.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-xs text-muted font-mono uppercase tracking-widest mr-2">Recent:</span>
          {recentSearches.map((search) => (
            <button
              key={search}
              onClick={() => { setInput(search); handleSearch(undefined, search); }}
              className="bg-white/5 border border-white/10 rounded-full px-3 py-1 font-mono text-xs text-muted hover:border-white/30 hover:text-white transition-colors"
            >
              {formatAddress(search) !== search && !search.endsWith('.eth') ? formatAddress(search) : search}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
