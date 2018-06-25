import React from 'react'
import PropTypes from 'prop-types'

import DropDown from './baseline-arrow_drop_down-24px.svg'

class PageSizeChooser extends React.Component {
  static propTypes = {
    pageSizeOptions: PropTypes.array,
    pageSize: PropTypes.number,
    handlePageSizeChange: PropTypes.func
  }

  static defaultProps = {
    pageSizeOptions: []
  }

  state = {
    open: false,
    pageSizeOptions: this.props.pageSizeOptions
  }

  handlePageSizeChange = e => {
    this.props.handlePageSizeChange(e)
    this.setState(state => ({ open: false }))
  }

  render () {
    const { open, pageSizeOptions } = this.state
    const { pageSize } = this.props

    return (
      <div
        style={{ position: 'relative', outline: 'none' }}
        tabIndex={open ? '0' : '-1'}
        onBlur={e => this.setState(state => ({ open: false }))}
      >
        <div
          style={{
            display: 'flex',
            opacity: `${open ? '1' : '0'}`,
            visibility: `${open ? 'visible' : 'hidden'}`,
            animiation: 'fadeIn 200ms',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'absolute',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid transparent',
            top: `-${pageSizeOptions.length * 2 + 1}rem`,
            left: '-2rem',
            minWidth: '7rem',
            background: '#fff',
            zIndex: 2,
            borderRadius: '0.5em',
            padding: 'calc(0.5rem - 1px) 0px',
            boxShadow:
              ' 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            transition:
              'opacity 300ms cubic-bezier(0.600, -0.030, 0.340, 0.895)'
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}
          >
            {pageSizeOptions.map(option => (
              <li key={option} className='menu-li'>
                <button
                  value={option}
                  className={`${pageSize === option ? 'selected' : ''}`}
                  onMouseDown={this.handlePageSizeChange}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={e => this.setState(state => ({ open: true }))}
          className='menu-dropdown'
          type='button'
        >
          <span style={{ padding: '0 0 0 0.75em', lineHeight: '24px' }}>
            {pageSize}
          </span>

          <img src={DropDown} alt='drop-down' />
        </button>
      </div>
    )
  }
}

export default PageSizeChooser
