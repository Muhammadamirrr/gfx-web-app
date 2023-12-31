import React from 'react'
import styled from 'styled-components'
import { Toggle } from './Toggle'
import { SearchBar, Categories } from '../../components'
import { categories } from './mockData'

const STYLED_FARM_HEADER = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.margin(4)} ${({ theme }) => theme.margin(5)};
  background: ${({ theme }) => theme.farmHeaderBg};
  box-shadow: 0 7px 15px 9px rgba(13, 13, 13, 0.25);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  .search-bar {
    height: 60px;
    margin: 0;
    background: #000;
    input {
      background: #000;
    }
  }
  .pools {
    height: 60px;
    max-width: 132px;
    margin-left: ${({ theme }) => theme.margin(4.5)};
    > span {
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
    }
  }
  .live {
    margin-left: ${({ theme }) => theme.margin(4.5)};
  }
`

const STYLED_RIGHT = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: ${({ theme }) => theme.margin(11)};
`
export const FarmHeader = ({ onFilter }: any) => (
  <STYLED_FARM_HEADER>
    <Toggle className="toggle" text="Staked Only" defaultUnchecked />
    <STYLED_RIGHT>
      <SearchBar className="search-bar" placeholder="Search by token symbol" />
      <Categories className="pools" categories={categories} />
      <Toggle className="live" checkedChildren="Ended" unCheckedChildren="Live" defaultUnchecked />
    </STYLED_RIGHT>
  </STYLED_FARM_HEADER>
)
