import * as React from 'react'
import { StyledComponentProps } from '@material-ui/core/styles'

export interface NavigationProps extends StyledComponentProps {
  title: string
  items: React.ReactNode
  children: React.ReactNode
  headerRight?: React.ReactNode
}

declare class Navigation extends React.Component<NavigationProps> {}
export default Navigation
