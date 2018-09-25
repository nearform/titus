import React from 'react'
import styled from 'react-emotion'
import { Link as BaseLink } from 'docz'

export const LinkStyled = styled('a')`
  &,
  &:visited,
  &:active {
    color: ${p => p.theme.docz.colors.link};
  }

  &:hover {
    color: ${p => p.theme.docz.colors.linkHover};
  }
`

export const Link = ({ href, ...props }) => {
  const isInternal = href && href.startsWith('/')
  const Component = isInternal ? LinkStyled.withComponent(BaseLink) : LinkStyled

  return isInternal ? (
    <Component {...props} to={href} />
  ) : (
    <Component {...props} href={href} />
  )
}
