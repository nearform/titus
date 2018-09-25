import React from 'react'
import { Component } from 'react'
import {
  Link as BaseLink,
  LinkProps as BaseLinkProps,
  Entry,
  ThemeConfig
} from 'docz'

import styled, { css } from 'react-emotion'

const activeWrapper = p => css`
  padding-left: 0;

  &:after {
    width: 1px;
  }
`

const Wrapper = styled('div')`
  position: relative;
  transition: padding 0.2s;

  &:after {
    position: absolute;
    display: block;
    content: '';
    top: 30px;
    left: 24px;
    width: 0;
    height: calc(100% - 36px);
    border-left: 1px dashed ${p => p.theme.docz.colors.border};
    transition: width 0.2s;
  }

  ${p => p.active && activeWrapper(p)};
`

export const linkStyle = ({ colors }) => css`
  position: relative;
  display: block;
  padding: 4px 24px;
  font-weight: 600;
  color: ${colors.sidebarText};
  text-decoration: none;
  transition: color 0.2s;

  &:hover,
  &:visited {
    color: ${colors.sidebarText};
  }

  &:hover {
    color: ${colors.linkHover};
  }

  &.active {
    color: ${colors.link};
    font-weight: 600;
  }
`

const Submenu = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 5px 0 0 24px;
`

const SmallLink = styled(BaseLink)`
  position: relative;
  font-size: 14px;
  padding: 0 0 5px 16px;
  text-decoration: none;
  opacity: 0.5;
  transition: opacity 0.2s;

  &,
  &:visited,
  &.active {
    color: ${p => p.theme.docz.colors.sidebarText};
  }

  &.active {
    opacity: 1;
  }

  &:before {
    z-index: 1;
    position: absolute;
    display: block;
    content: '';
    top: 0;
    left: 0;
    width: 0;
    height: 20px;
    background: ${p => p.theme.docz.colors.primary};
    transition: width 0.2s;
  }

  &.active:before {
    width: 2px;
  }
`

const isSmallLinkActive = slug => (m, location) =>
  slug === location.hash.slice(1, Infinity)

export const getActiveFromClass = el => {
  if (el) {
    const classes = el.classList
    return classes.contains('active')
  }

  return false
}

export class Link extends React.Component {
  $el
  state = {
    active: false
  }

  constructor(props) {
    super(props)
    this.$el = null
  }

  updateActive = prevActive => {
    const active = getActiveFromClass(this.$el)
    if (prevActive !== active) this.setState({ active })
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateActive(prevState.active)
  }

  componentDidMount() {
    this.updateActive(this.state.active)
  }

  render() {
    const { doc, onClick, ...props } = this.props
    const { active } = this.state
    const headings = doc.headings.filter(({ depth }) => depth > 1 && depth < 3)

    return (
      <Wrapper active={active}>
        <ThemeConfig>
          {config => (
            <BaseLink
              {...props}
              className={linkStyle(config.themeConfig)}
              onClick={onClick}
              innerRef={node => {
                this.$el = node
              }}
            />
          )}
        </ThemeConfig>
        {active &&
          headings.length > 0 && (
            <Submenu>
              {headings.map(heading => (
                <SmallLink
                  key={heading.slug}
                  onClick={onClick}
                  to={{ pathname: doc.route, hash: heading.slug }}
                  isActive={isSmallLinkActive(heading.slug)}
                >
                  {heading.value}
                </SmallLink>
              ))}
            </Submenu>
          )}
      </Wrapper>
    )
  }
}
