import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Market } from '@project-serum/serum'
import { ENDPOINTS } from './settings'
import { serum } from '../web3'
import { Connection } from '@solana/web3.js'

interface ICrypto {
  decimals: number
  market?: Market
  pair: string
  type: MarketType
}

export type MarketSide = 'asks' | 'bids'

interface ICryptoConfig {
  formatPair: (x: string) => string
  getAskSymbolFromPair: (x: string) => string
  getBidSymbolFromPair: (x: string) => string
  getSymbolFromPair: (x: string, y: 'buy' | 'sell') => string
  selectedCrypto: ICrypto
  setSelectedCrypto: Dispatch<SetStateAction<ICrypto>>
}

export type MarketType = 'crypto' | 'synth'

export const FEATURED_PAIRS_LIST = [
  { decimals: 3, pair: 'GOFX/USDC', type: 'crypto' as MarketType },
  { decimals: 1, pair: 'BTC/USDC', type: 'crypto' as MarketType },
  { decimals: 2, pair: 'ETH/USDC', type: 'crypto' as MarketType },
  { decimals: 3, pair: 'SOL/USDC', type: 'crypto' as MarketType },
  { decimals: 3, pair: 'LINK/USDC', type: 'crypto' as MarketType },
  { decimals: 2, pair: 'AAPL/USD', type: 'synth' as MarketType },
  { decimals: 2, pair: 'AMZN/USD', type: 'synth' as MarketType },
  { decimals: 2, pair: 'TSLA/USD', type: 'synth' as MarketType }
]

const CryptoContext = createContext<ICryptoConfig | null>(null)

export const CryptoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<ICrypto>(FEATURED_PAIRS_LIST[0])
  const connection = useMemo(() => new Connection(ENDPOINTS[2].endpoint, 'recent'), [])

  useEffect(() => {
    ;(async () => {
      try {
        const market = await serum.getMarket(connection, selectedCrypto.pair)
        setSelectedCrypto((prevState) => ({ ...prevState, market }))
      } catch (e) {}
    })()
  }, [connection, selectedCrypto.pair])

  const formatPair = (symbol: string) => symbol.replace('/', ' / ')

  const getAskSymbolFromPair = (pair: string): string => pair.slice(0, pair.indexOf('/'))

  const getBidSymbolFromPair = (pair: string): string => pair.slice(pair.indexOf('/') + 1)

  const getSymbolFromPair = (pair: string, side: 'buy' | 'sell'): string => {
    return side === 'buy' ? getBidSymbolFromPair(pair) : getAskSymbolFromPair(pair)
  }

  return (
    <CryptoContext.Provider
      value={{
        formatPair,
        getAskSymbolFromPair,
        getBidSymbolFromPair,
        getSymbolFromPair,
        selectedCrypto,
        setSelectedCrypto
      }}
    >
      {children}
    </CryptoContext.Provider>
  )
}

export const useCrypto = (): ICryptoConfig => {
  const context = useContext(CryptoContext)
  if (!context) {
    throw new Error('Missing crypto context')
  }

  return {
    formatPair: context.formatPair,
    getAskSymbolFromPair: context.getAskSymbolFromPair,
    getBidSymbolFromPair: context.getBidSymbolFromPair,
    getSymbolFromPair: context.getSymbolFromPair,
    selectedCrypto: context.selectedCrypto,
    setSelectedCrypto: context.setSelectedCrypto
  }
}
