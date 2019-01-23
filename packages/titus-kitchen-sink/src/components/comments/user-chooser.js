import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { MenuContainer } from './'

export const UserChooser = ({ values, onChange }) => (
  <MenuContainer values={values}>
    {({
        options,
        getSelectedOption,
        getMenuProps,
        getMenuItemProps,
        getListItemProps
      }) => (
      <React.Fragment>
        <List>
          <ListItem
            {...getListItemProps({
              button: true,
              'aria-haspopup': 'true',
              'aria-controls': 'user-select-menu',
              'aria-label': 'Select a User'
            })}
          >
            <ListItemText primary={getSelectedOption()}/>
          </ListItem>
        </List>

        <Menu {...getMenuProps()}>
          {options.map((option, index) => (
            <MenuItem {...getMenuItemProps({ option, index, onChange })}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    )}
  </MenuContainer>
)

UserChooser.propTypes = {
  values: PropTypes.array.isRequired
}

export default UserChooser
