import { Network, Alchemy } from 'alchemy-sdk';
import { NFTDisplayData } from './types';

const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "demo",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const fetchNFTs = async (address: string) => {
    try {
        const nfts = await alchemy.nft.getNftsForOwner(address, {
            omitMetadata: false,
        });

        const formattedNfts: NFTDisplayData[] = nfts.ownedNfts.map(nft => {
            // @ts-ignore - Alchemy SDK types can be slightly inaccurate for raw
            const rawMetadata = nft.raw?.metadata;
            
            const rawImage = nft.image?.cachedUrl || nft.image?.originalUrl || rawMetadata?.image || nft.contract.openSeaMetadata?.imageUrl || "";
            // Resolve ipfs://
            const imageUrl = rawImage.startsWith("ipfs://") 
                ? rawImage.replace("ipfs://", "https://ipfs.io/ipfs/") 
                : rawImage;

            const attributes = rawMetadata?.attributes || [];
            // Handle array of attributes
            const traits = Array.isArray(attributes) ? attributes.map((attr: any) => ({
                displayType: attr.display_type,
                traitType: attr.trait_type || 'Unknown',
                value: attr.value || '',
            })) : [];

            return {
                contractAddress: nft.contract.address,
                tokenId: nft.tokenId,
                tokenType: nft.tokenType,
                name: nft.name || rawMetadata?.name || `${nft.contract.name || 'Unknown'} #${nft.tokenId}`,
                collectionName: nft.contract.name || nft.contract.openSeaMetadata?.collectionName || 'Unknown Collection',
                imageUrl,
                description: nft.description || rawMetadata?.description || "",
                traits,
                floorPrice: nft.contract.openSeaMetadata?.floorPrice,
            };
        }).filter(nft => nft.imageUrl !== ""); // Only return NFTs with images for the gallery

        return {
            ownedNfts: formattedNfts,
            totalCount: nfts.totalCount
        };
    } catch (error) {
        console.error("Error fetching NFTs:", error);
        throw new Error("Failed to fetch NFTs");
    }
}
