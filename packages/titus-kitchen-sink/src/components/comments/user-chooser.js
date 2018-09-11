import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { List, ListItem, ListItemText } from '@material-ui/core'

export class MenuContainer extends React.Component {
  state = {
    options: this.props.values,
    anchorEl: null,
    selectedIndex: 0
  }
  handleOpenList = event => {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleCloseList = () => {
    this.setState({ anchorEl: null })
  }
  handleUpdateList = (selectedIndex, cb) => {
    this.setState({ anchorEl: null, selectedIndex }, () =>
      cb(this.getSelectedOption())
    )
  }
  getMenuProps = ({ ...rest }) => {
    const { anchorEl } = this.state

    return {
      ...rest,
      anchorEl: anchorEl,
      open: Boolean(anchorEl),
      onClose: this.handleCloseList
    }
  }
  getMenuItemProps = ({ option, index, onChange, ...rest }) => {
    return {
      ...rest,
      key: option,
      selected: index === this.state.selectedIndex,
      onClick: this.handleUpdateList.bind(this, index, onChange)
    }
  }
  getListItemProps = ({ ...rest }) => {
    return {
      ...rest,
      onClick: this.handleOpenList
    }
  }
  getSelectedOption = ({ ...rest }) => {
    const { options = [], selectedIndex } = this.state

    return options[selectedIndex] || ''
  }
  render() {
    const { options } = this.state
    const { children } = this.props

    return children({
      options,
      getSelectedOption: this.getSelectedOption,
      getListItemProps: this.getListItemProps,
      getMenuProps: this.getMenuProps,
      getMenuItemProps: this.getMenuItemProps
    })
  }
}

export const Chooser = ({ values, onChange }) => (
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
            <ListItemText primary={getSelectedOption()} />
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

Chooser.propTypes = {
  values: PropTypes.array.isRequired
}

export default Chooser
