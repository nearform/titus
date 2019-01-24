import PropTypes from 'prop-types'
import { Component } from 'react'

class MenuContainer extends Component {
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

MenuContainer.propTypes = {
  values: PropTypes.array.isRequired
}

export default MenuContainer
