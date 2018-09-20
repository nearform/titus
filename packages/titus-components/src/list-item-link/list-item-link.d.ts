import * as React from 'react'
import { ListItemProps } from '@material-ui/core/ListItem'
import { LinkProps } from '@reach/router'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface ListItemLinkProps
  extends Omit<ListItemProps, 'button' | 'component'> {}

export const ListItemLink: React.SFC<ListItemLinkProps & LinkProps<{}>>
