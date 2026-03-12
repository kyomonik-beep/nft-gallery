import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  variable: "--font-space-grotesk" 
});
const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600"], 
  variable: "--font-inter" 
});
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  weight: ["400", "500"], 
  variable: "--font-jetbrains-mono" 
});

export const metadata: Metadata = {
  title: "Bitcoin DeFi NFT Gallery",
  description: "View any Ethereum Wallet's NFT Portfolio with style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased selection:bg-primary/30 selection:text-primary min-h-screen bg-background text-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
