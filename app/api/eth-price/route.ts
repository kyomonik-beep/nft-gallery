import { NextResponse } from "next/server";
import { fetchEthPrice } from "@/lib/coingecko";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const price = await fetchEthPrice();
    return NextResponse.json({ price });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ETH price" }, { status: 500 });
  }
}
