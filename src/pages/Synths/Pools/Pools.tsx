import React, { FC, ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Claim } from './Claim'
import { DepositWithdraw } from './DepositWithdraw'
import { Faucet } from './Faucet'
import { MintBurn } from './MintBurn'
import { PoolSelector } from './PoolSelector'
import { Swap } from './Swap'
import { FlexColumnDiv, SpaceBetweenDiv } from '../../../styles'

const HEADER = styled(SpaceBetweenDiv)<{ $tab: number }>`
  ${({ theme }) => theme.largeBorderRadius}
  background-color: ${({ theme }) => theme.grey4};

  span {
    font-size: 12px;
    font-weight: bold;
    color: ${({ theme }) => theme.text1h};

    &:hover {
      color: white;

      &:not(:nth-child(${({ $tab }) => $tab + 1})) {
        cursor: pointer;
      }
    }

    &:nth-child(${({ $tab }) => $tab + 1}) {
      color: white;
    }
  }
`

const TAB = styled(FlexColumnDiv)`
  justify-content: space-between;
  height: 100%;
  padding: ${({ theme }) => theme.margin(5)} ${({ theme }) => theme.margin(3)} ${({ theme }) => theme.margin(3)};
`

const TABS = styled(SpaceBetweenDiv)`
  flex: 1;
  padding: ${({ theme }) => theme.margin(3)} ${({ theme }) => theme.margin(4)};

  > span:not(:last-child) {
    margin-right: ${({ theme }) => theme.margin(4)};
  }
`

const WRAPPER = styled(FlexColumnDiv)<{ $visible: boolean }>`
  height: 280px;
  max-height: ${({ $visible }) => ($visible ? '280px' : '0')};
  ${({ theme }) => theme.largeBorderRadius}
  ${({ theme }) => theme.largeShadow}
  background-color: ${({ theme }) => theme.bg3};
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  transition: opacity ${({ theme }) => theme.mainTransitionTime} ease-in-out,
    max-height ${({ theme }) => theme.mainTransitionTime} ease-in-out;
`

export const Pools: FC<{ poolsVisible: boolean }> = ({ poolsVisible }) => {
  const [tab, setTab] = useState(0)

  const tabs = [
    { component: <Faucet />, display: 'Faucet' },
    { component: <DepositWithdraw action="deposit" />, display: 'Deposit' },
    { component: <MintBurn action="mint" />, display: 'Mint' },
    { component: <Swap />, display: 'Swap' },
    { component: <MintBurn action="burn" />, display: 'Burn' },
    { component: <DepositWithdraw action="withdraw" />, display: 'Withdraw' },
    { component: <Claim />, display: 'Rewards' }
  ] as { component: ReactNode; display: string }[]

  return (
    <WRAPPER $visible={poolsVisible}>
      <HEADER $tab={tab}>
        <PoolSelector />
        <TABS>
          {tabs.map(({ component, display }, index) => (
            <span key={index} onClick={() => setTab(index)}>
              {display}
            </span>
          ))}
        </TABS>
      </HEADER>
      <TAB>{tabs[tab].component}</TAB>
    </WRAPPER>
  )
}
