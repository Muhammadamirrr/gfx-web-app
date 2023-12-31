import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Menu, MenuItem } from './shared'
import { ArrowDropdown } from '../../components'
import { MainText } from '../../styles'

// TODO: refactor this component and '../../components/Categories.tsx' into one component
const DROP_DOWN_WRAPPER = MainText(styled.button`
  ${({ theme }) => theme.flexCenter}
  height: ${({ theme }) => theme.margin(5)};
  border: none;
  ${({ theme }) => theme.roundedBorders}
  padding: 0 ${({ theme }) => theme.margin(2)};
  span {
    font-size: 12px;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }
`)

type listItem = { displayName: string; value: string; icon: string }

const Overlay: FC<{
  onOptionClick: (currentOption: listItem) => void
  options: Array<listItem>
}> = ({ onOptionClick, options }) => {
  return (
    <Menu>
      {options.map((item) => (
        <MenuItem onClick={() => onOptionClick(item)}>
          <span>{item.displayName}</span>
          <img src={`/img/assets/${item.icon}.svg`} alt="disconnect" />
        </MenuItem>
      ))}
    </Menu>
  )
}

const DropdownButton: FC<{
  title: string
  handleSelect: (selectedOption: string) => void
  options: Array<listItem>
  style?: any
  className?: string
}> = ({ title, handleSelect, options, style, className }) => {
  const [arrowRotation, setArrowRotation] = useState(false)
  const [currentTitle, setCurrentTitle] = useState(title)

  const onOptionClick = (item: listItem) => {
    setArrowRotation(false)
    setCurrentTitle(item.displayName)
    handleSelect(item.value)
  }

  return (
    <DROP_DOWN_WRAPPER style={style} className={className}>
      <span>{currentTitle}</span>
      <ArrowDropdown
        arrow
        arrowRotation={arrowRotation}
        offset={[9, 30]}
        onVisibleChange={(visible: boolean) => {}}
        overlay={<Overlay options={options} onOptionClick={onOptionClick} />}
        setArrowRotation={setArrowRotation}
      />
    </DROP_DOWN_WRAPPER>
  )
}

export default DropdownButton
