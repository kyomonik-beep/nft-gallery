export async function fetchEthPrice(): Promise<number> {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd", {
      cache: "no-store"
    });
    if (!res.ok) throw new Error("CoinGecko API error");
    const data = await res.json();
    return data.ethereum?.usd || 0;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return 0;
  }
}
