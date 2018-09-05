import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import { createMuiTheme } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core'

import Navigation from '../../src/navigation/navigation'

const muiTheme = createMuiTheme({
  direction: 'rtl'
})

const Items = ({ menuOpen }) => (
  <div id="mock-items">
    <div id="mock-items-menuopen" />
  </div>
)
const Main = ({ menuOpen }) => (
  <div id="mock-main">
    <div id="mock-main-menuopen" />
  </div>
)

const HeaderRight = ({ className }) => (
  <div id="mock-header-right" className={className} />
)

describe('Navigation', () => {
  it('should be defined', () => {
    expect(Navigation).toBeDefined()
  })

  describe('rendering', () => {
    test('With required props it should render correctly', () => {
      const { container, getByTestId } = render(
        <Navigation items={<Items />} title="Test title">
          <Main />
        </Navigation>
      )

      expect(container.querySelector('#mock-main')).not.toBeNull()
      expect(container.querySelector('#mock-items')).not.toBeNull()
      expect(container.querySelector('h2').textContent).toBe('Test title')
      expect(
        getByTestId('app-bar-drawer').firstChild.getAttribute('class')
      ).toContain('drawerPaperClose')
    })

    test('If headerRight is passed it should be rendered', () => {
      const { container } = render(
        <Navigation
          items={<Items />}
          title="Test title"
          headerRight={HeaderRight}
        >
          <Main />
        </Navigation>
      )

      expect(container.querySelector('#mock-header-right')).not.toBeNull()
      expect(
        container.querySelector('#mock-header-right').getAttribute('class')
      ).toContain('headerRight')
    })
  })

  describe('OpenClose Drawer', () => {
    test('Click the iconbutton should open the Drawer', () => {
      const { container, getByTestId } = render(
        <Navigation
          items={<Items />}
          title="Test title"
          headerRight={HeaderRight}
        >
          <Main />
        </Navigation>
      )
      expect(
        getByTestId('app-bar-drawer').firstChild.getAttribute('class')
      ).toContain('drawerPaperClose')

      fireEvent.click(container.querySelector('button[aria-label="Open Menu"]'))

      expect(container.querySelector('#mock-items-menuopen')).not.toBeNull()
      expect(container.querySelector('#mock-main-menuopen')).not.toBeNull()
      expect(
        getByTestId('app-bar-drawer').firstChild.getAttribute('class')
      ).not.toContain('drawerPaperClose')
    })

    test('Click on the Drawer when the menu is open should close the Drawer', () => {
      const { container, getByTestId } = render(
        <Navigation
          items={<Items />}
          title="Test title"
          headerRight={HeaderRight}
        >
          <Main />
        </Navigation>
      )

      fireEvent.click(container.querySelector('button[aria-label="Open Menu"]'))

      expect(
        getByTestId('app-bar-drawer').firstChild.getAttribute('class')
      ).not.toContain('drawerPaperClose')

      fireEvent.click(getByTestId('app-bar-drawer'))

      expect(getByTestId('app-bar').getAttribute('class')).not.toContain(
        'appBarShift'
      )
    })

    test('The icon is chevronRight if the theme has rtl direction', () => {
      const { getByTestId } = render(
        <MuiThemeProvider theme={muiTheme}>
          <Navigation
            items={<Items />}
            title="Test title"
            headerRight={HeaderRight}
          >
            <Main />
          </Navigation>
        </MuiThemeProvider>
      )

      expect(getByTestId('app-bar-drawer-icon-right')).not.toBeNull()
      expect(() => getByTestId('app-bar-drawer-icon-left')).toThrow()
    })

    test('The icon is chevronLeft if the theme has !rtl direction', () => {
      const { getByTestId } = render(
        <Navigation
          items={<Items />}
          title="Test title"
          headerRight={HeaderRight}
        >
          <Main />
        </Navigation>
      )

      expect(getByTestId('app-bar-drawer-icon-left')).not.toBeNull()
      expect(() => getByTestId('app-bar-drawer-icon-right')).toThrow()
    })
  })
})
