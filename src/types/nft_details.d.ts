import { Connection } from '@solana/web3.js'
import { Creator } from '../web3'

export interface IInfoItemData {
  thumbnail: string
  title: string
}

export interface IDetailTabItemData {
  title?: string
  value?: string
}

export interface ITradingHistoryTabItemData {
  id?: string
  price?: number
  event?: string
  from?: string
  to?: string
  date?: string
}

export interface IAttributesTabItemData {
  title?: string
  value?: string
  display_type?: string
  trait_type?: string
}

export interface IRemainingPanelData {
  days: string
  hours: string
  minutes: string
}

export interface IMetadataContext {
  name: string
  symbol: string
  description: string
  image: string | undefined
  animation_url: string | undefined
  attributes: Attribute[] | undefined
  external_url: string
  properties: any
  creators: Creator[] | null
  sellerFeeBasisPoints: number
}

export type INFTMetadata = {
  name: string
  symbol: string
  description: string
  seller_fee_basis_points: number
  external_url: string
  image: string
  attributes: IAttributesTabItemData[]
  properties: {
    files: { uri: string; type: string }[]
    category: string
    maxSupply?: number
    creators: Creator[]
  }
  collection?: { name: string; family: string } | { name: string; family: string }[]
  update_authority?: string
}

export type ISingleNFT = {
  non_fungible_id: number | null
  nft_name: string
  nft_description: string
  mint_address: string
  metadata_url: string
  image_url: string | null
  animation_url: string | null
  collection_id: number | null
  token_account: string | null
  owner: string | null
}

export type INFTBid = {
  bid_id: number
  clock: string
  tx_sig: string
  wallet_key: string
  auction_house_key: string
  token_account_key: string
  auction_house_treasury_mint_key: string
  token_account_mint_key: string
  buyer_price: string
  token_size: string
  non_fungible_id: number
  collection_id: number
  user_id: number
  event?: string
}

export type INFTAsk = {
  ask_id: number
  clock: string
  tx_sig: string
  wallet_key: string
  auction_house_key: string
  token_account_key: string
  auction_house_treasury_mint_key: string
  token_account_mint_key: string
  buyer_price: string
  token_size: string
  non_fungible_id: number
  collection_id: number
  user_id: number
  event?: string
}

export interface INFTGeneralData {
  data: ISingleNFT[]
  bids: INFTBid[]
  asks: INFTAsk[]
  bids_user_placed: INFTBid[]
  total_likes: number
}

export type NFTDetailsProviderMode =
  | 'live-auction-NFT'
  | 'my-created-NFT'
  | 'fixed-price-NFT'
  | 'open-bid-NFT'
  | 'mint-item-view'
  | 'my-external-NFT'

export type MintItemViewStatus = '' | 'placed' | 'successful' | 'unsuccessful'

export interface INFTDetailsConfig {
  general: ISingleNFT
  setGeneral: Dispatch<SetStateAction<ISingleNFT>>
  fetchGeneral: (id: string, connection: Connection) => Promise<any>
  nftMetadata: INFTMetadata
  setNftMetadata: Dispatch<SetStateAction<INFTMetadata>>
  bids: INFTBid[]
  setBids: Function
  bidOnSingleNFT: any
  curHighestBid: INFTBid | undefined
  removeBidOnSingleNFT: any
  ask: INFTAsk
  setAsk: Function
  nftMintingData: IMetadataContext | undefined
  setNftMintingData: Dispatch<SetStateAction<IMetadataContext>>
  updateUserInput: (params: any) => Promise<any>
  fetchUserInput: () => Promise<any>
  sellNFT: (params: any) => Promise<any>
  removeNFTListing: (id: number) => Promise<any>
  getLikesNFT: (user_id: any, nft_id: any) => Promise<any>
  getLikesUser: (user_id: number) => Promise<any>
  likeDislike: (user_id: number, nft_id: any) => Promise<any>
  totalLikes: number
  setTotalLikes: Dispatch<SetStateAction<number>>
}
