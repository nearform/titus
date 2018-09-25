import React from 'react'
import { Component } from 'react'
import { injectGlobal } from 'emotion'
import styled from 'react-emotion'
import get from 'lodash.get'

const Wrapper = styled('div')`
  display: flex;
  max-width: 100vw;
`

const base = body =>
  injectGlobal`
    body {
      ${body};
    }
  `

export class Main extends React.Component {
  componentDidUpdate(prevProps) {
    const body = this.getBody(this.props)
    const prevBody = this.getBody(prevProps)

    if (body && prevBody !== body) base(body)
  }

  componentDidMount() {
    base(this.getBody(this.props))
  }

  render() {
    return <Wrapper>{this.props.children}</Wrapper>
  }

  getBody(props) {
    return get(props, 'config.themeConfig.styles.body')
  }
}
