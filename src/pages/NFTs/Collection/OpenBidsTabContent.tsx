import { useState, useEffect, FC, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Card } from './Card'
import { useNFTCollections, useNFTProfile } from '../../../context'
import { ISingleNFT } from '../../../types/nft_details.d'
import { Loader } from '../../../components'
import debounce from 'lodash.debounce'

const WRAPPER = styled.div``

const OPEN_BIDS_TAB = styled.div`
  ${({ theme }) => css`
    overflow-y: auto;
    padding: ${theme.margin(5.5)} ${theme.margin(4)};

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    grid-gap: ${theme.margin(6)};

    &::-webkit-scrollbar {
      display: none;
    }
  `}
`
const NO_CONTENT = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  color: ${({ theme }) => theme.text8};

  .no-data-image {
    max-width: 160px;
    margin-bottom: 20px;
  }
`
const EMPTY_MSG = styled.div`
  ${({ theme }) => theme.flexCenter}
  width: 100%;
`
const WRAPPED_LOADER = styled.div`
  position: relative;
  height: 48px;
`

export const OpenBidsTabContent = ({ filter, setCollapse, ...rest }) => {
  const { openBidWithinCollection } = useNFTCollections()
  const { sessionUser } = useNFTProfile()

  const [localOpenBid, setLocalOpenBid] = useState<Array<ISingleNFT>>()
  const [fileredLocalOpenBid, _setFilteredLocalOpenBid] = useState<Array<ISingleNFT>>()
  const [shortfileredLocalOpenBid, _setShortFilteredLocalOpenBid] = useState<Array<ISingleNFT>>()
  const [level, _setLevel] = useState<number>(0)
  const [loading, _setLoading] = useState<boolean>(false)

  // define a ref
  const activePointRef = useRef(fileredLocalOpenBid)
  const activePointLevel = useRef(level)
  const activePointshortFilter = useRef(shortfileredLocalOpenBid)
  const activePointLoader = useRef(loading)

  // in place of original `setActivePoint`
  const setFilteredLocalOpenBid = (x) => {
    activePointRef.current = x // keep updated
    _setFilteredLocalOpenBid(x)
  }

  const setLevel = (x) => {
    activePointLevel.current = x // keep updated
    _setLevel(x)
  }

  const setShortFilteredLocalOpenBid = (x) => {
    activePointshortFilter.current = x // keep updated
    _setShortFilteredLocalOpenBid(x)
  }

  const setLoading = (x) => {
    activePointLoader.current = x // keep updated
    _setLoading(x)
  }

  useEffect(() => {
    if (openBidWithinCollection) {
      setLocalOpenBid(openBidWithinCollection.open_bid)
    }
    return () => {}
  }, [openBidWithinCollection])

  useEffect(() => {
    if (localOpenBid) {
      const filteredData = localOpenBid.filter(
        (i) =>
          i.nft_name.toLowerCase().includes(filter.trim().toLowerCase()) ||
          `${i.non_fungible_id}`.includes(filter.trim())
      )

      setFilteredLocalOpenBid(filteredData)
      setShortFilteredLocalOpenBid(filteredData.slice(0, 25))
      setLevel(0)
    }
  }, [filter, localOpenBid])

  useEffect(() => {
    window.addEventListener(
      'scroll',
      debounce(() => {
        handleScroll()
      }, 100),
      true
    )

    return () =>
      window.removeEventListener(
        'scroll',
        debounce(() => {
          handleScroll()
        }, 100),
        true
      )
  }, [])

  const handleScroll = () => {
    const border = document.getElementById('border')
    if (border !== null) {
      const mainHeight = window.innerHeight
      const totalscroll = mainHeight + border.scrollTop + 100
      //let former = 0
      //console.log(border.scrollHeight, border.scrollTop)

      if (border.scrollTop < 50) {
        setCollapse(false)
      } else {
        setCollapse(true)
      }

      if (Math.ceil(totalscroll) < border.scrollHeight || activePointLoader.current) {
        setLoading(false)
      } else {
        addToList()
      }
    }
  }

  const addToList = () => {
    const total = activePointRef.current
    const newLevel = activePointLevel.current + 1

    if (total?.length > newLevel * 25) {
      setLoading(true)
      const nextData = total.slice(newLevel * 25, (newLevel + 1) * 25)
      setShortFilteredLocalOpenBid([...activePointshortFilter.current, ...nextData])
      setLevel(newLevel)
      setLoading(false)

      // force scroll up to avoid over push
      // let border = document.getElementById('border')
      // border.scrollTop = border.scrollTop
    }
  }

  // TODO: lazy loader for the thousands of nfts
  return (
    <WRAPPER>
      {fileredLocalOpenBid === undefined ? (
        <OPEN_BIDS_TAB {...rest} className="card-list">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => (
            <div>
              <Card key={index} singleNFT={null} listingType="bid" />
            </div>
          ))}
        </OPEN_BIDS_TAB>
      ) : fileredLocalOpenBid.length > 0 ? (
        <OPEN_BIDS_TAB {...rest} className="card-list">
          {shortfileredLocalOpenBid.map((item: ISingleNFT) => (
            <Card key={item.non_fungible_id} singleNFT={item} listingType="bid" />
          ))}
          {loading && (
            <WRAPPED_LOADER>
              <Loader />
            </WRAPPED_LOADER>
          )}
        </OPEN_BIDS_TAB>
      ) : (
        <NO_CONTENT>
          <div>
            <img className="no-data-image" src={`/img/assets/collected-no-data.png`} alt="" />
            <p>No Open Bid NFTs Listed</p>
          </div>
        </NO_CONTENT>
      )}
    </WRAPPER>
  )
}
