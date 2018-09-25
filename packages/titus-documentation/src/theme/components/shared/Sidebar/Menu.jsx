import React from 'react'
import { Entry } from 'docz'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import styled from 'react-emotion'

import { Link, linkStyle, getActiveFromClass } from './Link'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
`

const List = styled('dl')`
  flex: 1;
  overflow-y: auto;
  visibility: ${p => (p.opened ? 'visible' : 'hidden')};
  max-height: ${p => (p.opened ? 'auto' : '0px')};
`

export const MenuLink = styled('a')`
  ${p => linkStyle(p.theme.docz)};
`

const iconRotate = p => (p.opened ? '-180deg' : '0deg')

const Icon = styled('div')`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%) rotate(${iconRotate});
  transform-origin: 50% 50%;
  transition: transform 0.3s;

  & svg {
    stroke: ${p => p.theme.docz.colors.text};
  }
`

export class Menu extends React.Component {
  $els
  state = {
    opened: false,
    hasActive: false
  }

  constructor(props) {
    super(props)
    this.$els = []
  }

  componentDidMount() {
    this.checkActiveLink()
  }

  render() {
    const { menu, docs, sidebarToggle, collapseAll } = this.props
    const show = collapseAll || this.state.opened
    const handleToggle = ev => {
      ev.preventDefault()
      this.toggle()
    }

    return (
      docs.length > 0 && (
        <Wrapper>
          <MenuLink href="#" onClick={handleToggle}>
            {menu}
            <Icon opened={show}>
              <ChevronDown size={15} />
            </Icon>
          </MenuLink>
          <List opened={show}>
            {docs.map(doc => (
              <dt key={doc.id}>
                <Link
                  onClick={sidebarToggle}
                  to={doc.route}
                  doc={doc}
                  ref={node => {
                    this.$els = this.$els.concat([node])
                  }}
                >
                  {doc.name}
                </Link>
              </dt>
            ))}
          </List>
        </Wrapper>
      )
    )
  }

  toggle = () => {
    this.setState(state => ({ opened: !state.opened }))
  }

  checkActiveLink = () => {
    const hasActive = this.$els.some(({ $el }) => getActiveFromClass($el))
    if (hasActive) this.setState({ hasActive, opened: true })
  }
}
