import { create } from '@storybook/theming/create'
// import {baseFonts, monoFonts} from '@storybook/components'

const brand = {
  blue: '#2165e5',
  blueDark: '#194caa',
  grey: '#6d6d68',
  greyLight: '#efefef',
  greyLighter: '#f4f4f2',
  orange: '#fd775e',
  pink: '#fd7a9e',
  green: '#5EFB89',
  white: '#FFFFFF'
}

// see https://storybook.js.org/configurations/theming/
// for more information on what can be themed

const oldTheme = {
  base: 'light',

  colorPrimary: 'hotpink',
  colorSecondary: 'deepskyblue',

  // UI
  appBg: 'white',
  appContentBg: 'silver',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: 'black',
  barBg: 'hotpink',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'My custom storybook',
  brandUrl: 'https://example.com',
  brandImage: 'https://placehold.it/350x150'
}

// export default oldTheme

export default create({
  // variables
  mainBackground: brand.blue,
  mainBorder: brand.blue,
  mainBorderColor: brand.blue,
  mainBorderRadius: 4,
  mainFill: brand.greyLighter,
  barFill: brand.white,
  barSelectedColor: brand.orange,
  inputFill: brand.blueDark,

  // monoTextFace: monoFonts.fontFamily,
  // mainTextFace: baseFonts.fontFamily,

  mainTextColor: brand.grey,
  dimmedTextColor: brand.greyLight,
  highlightColor: brand.orange,
  successColor: brand.green,
  failColor: brand.pink,
  warnColor: brand.orange,
  mainTextSize: 14,

  layoutMargin: 10,

  // components
  brand: { background: brand.blueDark },
  brandLink: { border: 'none' },
  storiesNav: { color: brand.white }
})
