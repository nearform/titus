import React from 'react'
import { Toggle } from 'react-powerplug'

import { Button as BaseButton } from './Button'

export const ButtonSwap = ({
  as: Button = BaseButton,
  onClick,
  swap,
  children,
  ...props
}) => (
  <Toggle>
    {({ toggle, on }) => {
      const hasSwap = Boolean(swap)
      const handleClick = ev => {
        hasSwap && toggle()
        onClick && onClick(ev)
        hasSwap && setTimeout(toggle, 500)
      }

      return (
        <Button onClick={handleClick} {...props}>
          {on ? swap : children}
        </Button>
      )
    }}
  </Toggle>
)
