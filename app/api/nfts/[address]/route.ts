import { NextResponse } from "next/server";
import { fetchNFTs } from "@/lib/alchemy";
import { resolveENS } from "@/lib/ens";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { address: string } }) {
  try {
    const { address } = params;
    
    // Attempt to resolve ENS if it's not a direct address
    const resolvedAddress = await resolveENS(address);
    if (!resolvedAddress) {
       return NextResponse.json({ error: "Invalid address or ENS name" }, { status: 400 });
    }

    const data = await fetchNFTs(resolvedAddress);
    
    return NextResponse.json({
      address: resolvedAddress,
      nfts: data.ownedNfts,
      totalCount: data.totalCount
    });
  } catch (error) {
    console.error("API error fetching NFTs:", error);
    return NextResponse.json({ error: "Failed to fetch NFTs" }, { status: 500 });
  }
}
