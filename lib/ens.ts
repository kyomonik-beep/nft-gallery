import { ethers } from "ethers";

// Public RPC for ENS resolution (or use Alchemy if key provided)
export async function resolveENS(nameOrAddress: string): Promise<string | null> {
  if (!nameOrAddress) return null;
  
  try {
    const rpcUrl = `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "demo"}`;

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    // If it's already a valid Ethereum address, return it
    if (ethers.isAddress(nameOrAddress)) {
      return nameOrAddress;
    }
    
    // Attempt to resolve ENS Name (e.g. vitalik.eth)
    if (nameOrAddress.endsWith(".eth")) {
      const address = await provider.resolveName(nameOrAddress);
      return address;
    }
    
    return null; // Could not resolve
  } catch (error) {
    console.error("ENS Resolution Error:", error);
    return null;
  }
}
