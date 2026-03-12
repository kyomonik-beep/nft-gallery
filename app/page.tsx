"use client";

import WalletSearch from "@/components/WalletSearch";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none translate-y-1/2"></div>

      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center animate-float">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            Explore the On-Chain World
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white">
            Discover Your <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-2">
              NFT Portfolio
            </span>
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto font-body">
            Enter an Ethereum address or ENS name to instantly view, analyze, and admire your digital artifacts.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <WalletSearch />
        </motion.div>
      </div>
    </main>
  );
}
