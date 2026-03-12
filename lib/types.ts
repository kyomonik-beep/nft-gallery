export interface Trait {
  displayType?: string;
  traitType: string;
  value: string | number;
}

export interface NFTDisplayData {
  contractAddress: string;
  tokenId: string;
  tokenType: string;
  name: string;
  collectionName: string;
  imageUrl: string;
  description: string;
  traits: Trait[];
  floorPrice?: number;
}

export interface NftResponse {
  address: string;
  nfts: NFTDisplayData[];
  totalCount: number;
}
