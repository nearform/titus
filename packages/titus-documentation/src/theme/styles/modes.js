import * as colors from './colors'
import lighten from 'polished/lib/color/lighten'

export const light = {
  ...colors,
  primary: colors.midnightBlue,
  text: colors.sand4,
  link: colors.blue,
  linkHover: colors.supersplit,
  footerText: colors.sand4,
  sidebarBg: colors.light,
  sidebarText: colors.sand4,
  background: colors.sand1,
  border: colors.grayLight,
  theadColor: colors.gray,
  theadBg: colors.grayExtraLight,
  tableColor: colors.dark,
  tableBg: colors.white,
  tooltipBg: colors.dark,
  tooltipColor: colors.grayExtraLight,
  codeBg: colors.grayExtraLight,
  codeColor: colors.gray,
  playgroundBg: colors.white,
  preBg: colors.grayExtraLight,
  blockquoteBg: colors.grayExtraLight,
  blockquoteBorder: colors.grayLight,
  blockquoteColor: colors.gray
}

export const dark = {
  ...colors,
  primary: colors.skyBlue,
  text: colors.grayExtraLight,
  link: colors.skyBlue,
  linkHover: colors.skyBlue,
  footerText: colors.grayLight,
  sidebarBg: colors.dark,
  sidebarText: colors.grayLight,
  background: colors.grayExtraDark,
  border: colors.grayDark,
  theadColor: colors.gray,
  theadBg: colors.grayDark,
  tableColor: colors.grayExtraLight,
  tableBg: colors.white,
  tooltipBg: colors.dark,
  tooltipColor: colors.grayExtraLight,
  codeBg: colors.gray,
  codeColor: colors.grayExtraLight,
  playgroundBg: colors.white,
  preBg: colors.grayDark,
  blockquoteBg: colors.grayDark,
  blockquoteBorder: colors.gray,
  blockquoteColor: colors.gray
}
