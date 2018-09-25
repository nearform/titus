import React from 'react'
import styled from 'react-emotion'

const IconFirst = p => (!p.opened ? '0px' : '10px')
const IconMiddle = p => (!p.opened ? '1' : '0')
const IconLast = p => (!p.opened ? '0px' : '-6px')
const IconRotate = p => (!p.opened ? '0deg' : '45deg')

const Icon = styled('div')`
  position: relative;
  width: 23px;
  height: 32px;
  transform: translateX(${p => (p.opened ? '-2px' : '-1px')})
    translateY(${p => (p.opened ? '0' : '2px')})
    scale(${p => (p.opened ? 0.8 : 1)});
`

const IconLine = styled('span')`
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  right: 0;
  background: ${p => p.theme.docz.colors.text};
  transition: transform 0.3s, opacity 0.3s;

  &:nth-child(1) {
    top: -2px;
    transform: translateY(${IconFirst}) rotate(${IconRotate});
  }

  &:nth-child(2) {
    top: 6px;
    opacity: ${IconMiddle};
  }

  &:nth-child(3) {
    top: 14px;
    transform: translateY(${IconLast}) rotate(-${IconRotate});
  }
`

const translateX = p => (!p.opened ? '10px' : '-6px')
const translateY = p => (!p.opened ? '4px' : '0px')

const ToggleButton = styled('button')`
  cursor: pointer;
  z-index: 99;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 6px;
  width: 33px;
  height: 30px;
  top: ${p => (p.opened ? '3px' : '2px')};
  right: ${p => (p.opened ? '-39px' : '-27px')};
  transform: translateX(${translateX}) translateY(${translateY});
  transition: transform 0.3s;
  outline: none;
  border: none;
  background: ${p =>
    p.opened ? p.theme.docz.colors.sidebarBg : p.theme.docz.colors.background};
  border-radius: ${p => (p.opened ? '0 0 3px 0' : '3px')};

  &:before {
    position: absolute;
    content: '';
    top: -3px;
    left: 0;
    width: calc(100% + 1px);
    height: ${p => (p.opened ? '3px' : 0)};
    background: ${p => p.theme.docz.colors.primary};
  }

  ${p =>
    p.theme.docz.mq({
      display: ['block', 'block', 'block', 'none']
    })};
`

export const Hamburguer = ({ opened, onClick }) => (
  <ToggleButton opened={opened} onClick={onClick}>
    <Icon opened={opened}>
      <IconLine opened={opened} />
      <IconLine opened={opened} />
      <IconLine opened={opened} />
    </Icon>
  </ToggleButton>
)
