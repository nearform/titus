import React from 'react'
import { ThemeConfig } from 'docz'
import styled from 'react-emotion'

import { breakpoints } from '../../../styles/responsive'

const Wrapper = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 24px;

  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${p => p.theme.docz.colors.primary};
  }

  @media screen and (max-width: ${breakpoints.desktop}px) {
    &:before {
      height: ${p => (p.showBg ? '3px' : 0)};
    }
  }
`

const LogoImg = styled('img')`
  padding: 0;
  margin: 5px 0;
`

const LogoText = styled('h1')`
  margin: 5px 0;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: ${p => p.theme.docz.colors.midnightBlue};
`

export const Logo = ({ showBg }) => (
  <ThemeConfig>
    {({ title, themeConfig: { logo } }) => (
      <Wrapper showBg={showBg}>
        {logo ? (
          <LogoImg src={logo.src} width={logo.width} alt={title} />
        ) : (
          <LogoText>{title}</LogoText>
        )}
      </Wrapper>
    )}
  </ThemeConfig>
)
