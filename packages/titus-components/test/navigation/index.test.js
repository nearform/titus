import React from 'react'
import { mount } from 'enzyme'
import { createMuiTheme } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core'

import Navigation from '../../src/navigation/navigation'

const muiTheme = createMuiTheme({
  direction: 'rtl'
})

const Items = ({ menuOpen }) => (
  <div id='mock-items'>{menuOpen && <div id='mock-items-menuopen' />}</div>
)
const Main = ({ menuOpen }) => (
  <div id='mock-main'>{menuOpen && <div id='mock-main-menuopen' />}</div>
)

const HeaderRight = ({ className }) => (
  <div id='mock-header-right' className={className} />
)

describe('Navigation', () => {
  describe('rendering', () => {
    test('With required props it should render correctly', () => {
      const wrapper = mount(
        <Navigation items={Items} main={Main} title='Test title' />
      )

      expect(wrapper.find('#mock-main').length).toBe(1)
      expect(wrapper.find('#mock-items').length).toBe(1)
      expect(wrapper.find('#mock-items-menuopen').length).toBe(0)
      expect(wrapper.find('#mock-main-menuopen').length).toBe(0)
      expect(wrapper.find('h2').text()).toBe('Test title')

      expect(wrapper.find('Drawer').props().open).toBeFalsy()
    })

    test('If headerRight is passed it should be rendered', () => {
      const wrapper = mount(
        <Navigation
          items={Items}
          main={Main}
          title='Test title'
          headerRight={HeaderRight}
        />
      )

      expect(wrapper.find('#mock-header-right').length).toBe(1)
      expect(wrapper.find('#mock-header-right').props().className).toContain(
        'headerRight'
      )
    })
  })

  describe('OpenClose Drawer', () => {
    test('Click the iconbutton should open the Drawer', () => {
      const wrapper = mount(
        <Navigation
          items={Items}
          main={Main}
          title='Test title'
          headerRight={HeaderRight}
        />
      )
      expect(wrapper.find('AppBar').props().className).not.toContain(
        'appBarShift'
      )

      wrapper.find('button[aria-label="Open Menu"]').simulate('click')
      wrapper.update()
      expect(wrapper.find('AppBar').props().className).toContain('appBarShift')
      expect(wrapper.find('#mock-items-menuopen').length).toBe(1)
      expect(wrapper.find('#mock-main-menuopen').length).toBe(1)
      expect(wrapper.find('Drawer').props().open).toBeTruthy()
    })

    test('Click on the Drawer when the menu is open should close the Drawer', () => {
      const wrapper = mount(
        <Navigation
          items={Items}
          main={Main}
          title='Test title'
          headerRight={HeaderRight}
        />
      )
      expect(wrapper.find('AppBar').props().className).not.toContain(
        'appBarShift'
      )

      wrapper.find('button[aria-label="Open Menu"]').simulate('click')
      wrapper.update()
      expect(wrapper.find('Drawer').props().open).toBeTruthy()

      wrapper.find('Drawer').simulate('click')
      wrapper.update()
      expect(wrapper.find('Drawer').props().open).toBeFalsy()
    })

    test('The icon is chevronRight if the theme has rtl direction', () => {
      const wrapper = mount(
        <MuiThemeProvider theme={muiTheme}>
          <Navigation
            items={Items}
            main={Main}
            title='Test title'
            headerRight={HeaderRight}
          />
        </MuiThemeProvider>
      )

      expect(wrapper.find('Drawer IconButton path').props().d).toBe(
        'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'
      )
    })

    test('The icon is chevronLeft if the theme has !rtl direction', () => {
      const wrapper = mount(
        <Navigation
          items={Items}
          main={Main}
          title='Test title'
          headerRight={HeaderRight}
        />
      )

      expect(wrapper.find('Drawer IconButton path').props().d).toBe(
        'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'
      )
    })
  })
})
