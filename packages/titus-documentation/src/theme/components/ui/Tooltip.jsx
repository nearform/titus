import React from 'react'
import { ThemeConfig } from 'docz'
import { Tooltip as BaseTooltip } from 'react-lightweight-tooltip'

const getStyles = colors => ({
  wrapper: {
    color: colors.primary
  },
  content: {
    backgroundColor: colors.tooltipBg,
    color: colors.tooltipColor
  },
  tooltip: {
    display: 'flex',
    alignItems: 'center',
    width: 220,
    maxWidth: 220,
    padding: 5,
    backgroundColor: colors.tooltipBg,
    borderRadius: '3px',
    fontSize: 16
  },
  arrow: {
    borderTop: `solid ${colors.tooltipBg} 5px`
  }
})

export const Tooltip = ({ text, children }) => (
  <ThemeConfig>
    {config => (
      <BaseTooltip styles={getStyles(config.themeConfig.colors)} content={text}>
        {children}
      </BaseTooltip>
    )}
  </ThemeConfig>
)
