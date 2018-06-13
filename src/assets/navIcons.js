import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import NotificationsIcon from '@material-ui/icons/Alarm'
import DocumentsIcon from '@material-ui/icons/Folder'
import MessagesIcon from '@material-ui/icons/Message'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ScheduleIcon from '@material-ui/icons/List'
import AddIcon from '@material-ui/icons/PersonAdd'

const AccountsIcon = props => (
  <SvgIcon {...props}>
    <path d='M21.3333333,0 C22.8,0 24,1.2 24,2.66666667 L24,21.3333333 C24,22.8 22.8,24 21.3333333,24 L2.66666667,24 C1.2,24 0,22.8 0,21.3333333 L0,2.66666667 C0,1.2 1.2,0 2.66666667,0 L21.3333333,0 Z M5,2 L1,5.99 L4,5.99 L4,13 L6,13 L6,5.99 L9,5.99 L5,2 Z M20,18.01 L20,11 L18,11 L18,18.01 L15,18.01 L19,22 L23,18.01 L20,18.01 Z M13.2450331,16.5675 C14.781457,16.32 15.99117,15.57 16,14.1975 C16,12.3075 14.0927152,11.655 12.3090508,11.265 C10.5253863,10.875 9.95143488,10.4625 9.95143488,9.8325 C9.95143488,9.1125 10.7461369,8.6025 12.0706402,8.6025 C13.4657837,8.6025 13.986755,9.1725 14.0309051,10.005 L15.7615894,10.005 C15.7086093,8.8575 14.8874172,7.8 13.2450331,7.4625 L13.2450331,6 L10.8874172,6 L10.8874172,7.4475 C9.36865342,7.725 8.14128035,8.565 8.14128035,9.855 C8.14128035,11.3925 9.64238411,12.1575 11.8322296,12.6075 C13.8013245,13.005 14.1898455,13.59 14.1898455,14.2125 C14.1898455,14.67 13.8013245,15.405 12.0706402,15.405 C10.4547461,15.405 9.81898455,14.79 9.73068433,14.0025 L8,14.0025 C8.09713024,15.4575 9.37748344,16.2825 10.8874172,16.5525 L10.8874172,18 L13.2450331,18 L13.2450331,16.5675 Z' />
  </SvgIcon>
)

export const menuIcons = {
  dashboard: DashboardIcon,
  accounts: AccountsIcon,
  schedule: ScheduleIcon,
  messages: MessagesIcon,
  notifications: NotificationsIcon,
  documents: DocumentsIcon,
  'add-team-member': AddIcon
}
