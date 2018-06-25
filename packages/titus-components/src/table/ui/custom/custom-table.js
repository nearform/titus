import React from 'react'
import PropTypes from 'prop-types'
import { TableHeaderRow, TableHeader } from 'react-nf-table'
import HeaderRow from './header-row'
import SortingHeaderCell from './sorting-header-cell'
import PageSizeChooser from './page-size-chooser'
import CheckBox from './checkbox'

import DeleteIcon from './baseline-delete-24px.svg'
import ForwardArrow from './baseline-arrow_forward_ios-24px.svg'
import BackArrow from './baseline-arrow_back_ios-24px.svg'

import './custom.css'

const TableBody = ({ component, children }) =>
  React.createElement(component, { children })

TableBody.propTypes = {
  component: PropTypes.string,
  children: PropTypes.array
}

function TableRow (props) {
  const { component, children, style, className } = props

  return React.createElement(component, {
    ...props,
    component: null,
    children,
    style,
    className
  })
}

TableRow.propTypes = {
  component: PropTypes.string,
  children: PropTypes.array,
  style: PropTypes.object,
  className: PropTypes.string
}

const TableData = ({ component, children, style, className }) =>
  React.createElement(component, { children, style, className })

TableData.propTypes = {
  component: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.object
}

class CustomTable extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onDelete: PropTypes.func,
    columns: PropTypes.array,
    rows: PropTypes.array,
    handleRowSelect: PropTypes.func,
    selecting: PropTypes.array,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    currentPage: PropTypes.number,
    pageSizeOptions: PropTypes.array,
    hasNextPage: PropTypes.bool,
    hasPrevPage: PropTypes.bool,
    handlePrevPage: PropTypes.func,
    handleNextPage: PropTypes.func,
    handlePageSizeChange: PropTypes.func
  }

  handleDelete = () => {
    const { onDelete, rows } = this.props
    onDelete(
      rows.filter(row => {
        return row.selected
      })
    )
  }

  handleSelectAllRows = () => {
    this.props.handleRowSelect('all')
  }

  handleRowSelect = rowKey => {
    this.props.handleRowSelect(rowKey)
  }

  handleNextPage = e => {
    this.props.handleNextPage(e)
  }

  handlePrevPage = e => {
    this.props.handlePrevPage(e)
  }

  handlePageSizeChange = e => {
    e && this.props.handlePageSizeChange(e)
  }

  render () {
    const {
      title,
      rows,
      columns,
      selecting,
      pageSize,
      pageSizeOptions,
      total,
      currentPage,
      hasNextPage,
      hasPrevPage
    } = this.props

    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            color: selecting.length > 0 ? '#673ab7' : 'rgba(0, 0, 0, 0.87)',
            background: selecting.length > 0 ? '#e8eaf6' : '#fff',
            margin: 0,
            padding: '1em 1em 0.5em 1em'
          }}
        >
          <h2 style={{ color: '#000' }}>{title}</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {selecting.length > 0 && (
              <React.Fragment>
                <p style={{ fontSize: '0.875rem', margin: '0 2em' }}>
                  <span>Number of rows selected: </span>
                  <span style={{ fontWeight: 'bold' }}>
                    {selecting[0] === 'all' ? rows.length : selecting.length}
                  </span>
                </p>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <button
                    type='button'
                    className='ripple-button'
                    onClick={this.handleDelete}
                  >
                    <img src={DeleteIcon} alt='delete-button' />
                  </button>
                  <span className='tooltip'>Delete Rows</span>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
        <div>
          <table
            style={{
              width: '100%',
              background: '#fff',
              borderSpacing: 0,
              borderCollapse: 'collapse'
            }}
          >
            <TableHeaderRow component={HeaderRow}>
              <th
                style={{ cursor: 'pointer' }}
                onClick={this.handleSelectAllRows}
              >
                <CheckBox checked={selecting[0] === 'all'} />
              </th>

              {columns.map(
                ({ accessor, sortable, label }, index) =>
                  accessor && (
                    <TableHeader
                      key={index}
                      sortable={sortable}
                      accessor={accessor}
                      component={SortingHeaderCell}
                    >
                      {label}
                    </TableHeader>
                  )
              )}
            </TableHeaderRow>
            <TableBody component='tbody' style={{ display: 'table-row-group' }}>
              {rows.map(({ rowKey, rowData, selected }, index) => (
                <TableRow
                  component='tr'
                  className='hover-tr'
                  key={rowKey}
                  onClick={e => {
                    this.handleRowSelect(rowKey)
                  }}
                  style={{
                    color: 'inherit',
                    height: '3em',
                    display: 'table-row',
                    outline: 'none',
                    verticalAlign: 'middle',
                    backgroundColor: selected ? '#E8EAF6' : ''
                  }}
                >
                  {rowData.map(({ accessor, data, key }) => (
                    <TableData
                      component='td'
                      key={key}
                      style={{
                        color: 'rgba(0, 0, 0, 0.87)',
                        fontSize: '0.8rem',
                        fontWeight: 400,
                        display: 'table-cell',
                        padding: '1em',
                        textAlign: 'center',
                        borderBottom: '1px solid rgba(224, 224, 224, 1)',
                        verticalAlign: 'inherit'
                      }}
                    >
                      {accessor ? data : <CheckBox checked={selected} />}
                    </TableData>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </table>
          <footer
            style={{
              background: '#fff',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              fontSize: '0.75rem',
              color: '#0000008a',
              padding: '2em 1em'
            }}
          >
            <span style={{ margin: '0 2em' }}>Rows per page:</span>
            <PageSizeChooser
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              handlePageSizeChange={this.handlePageSizeChange}
            />

            <span style={{ margin: '0 2em' }}>
              {currentPage * pageSize - pageSize + 1}-
              {currentPage * pageSize > total
                ? total
                : currentPage * pageSize}{' '}
              of {total}
            </span>
            <button
              style={{
                margin: '0 2em',
                opacity: `${hasPrevPage ? '1' : '0.25'}`,
                cursor: `${hasPrevPage ? 'pointer' : 'not-allowed'}`,
                border: 'none',
                background: 'inherit',
                borderRadius: 'initial',
                padding: 'initial',
                outline: 'none'
              }}
              onClick={this.handlePrevPage}
            >
              <img
                src={BackArrow}
                alt='back-arrow'
                style={{ width: '1.5em' }}
              />
            </button>
            <button
              style={{
                opacity: `${hasNextPage ? '1' : '0.25'}`,
                cursor: `${hasNextPage ? 'pointer' : 'not-allowed'}`,
                border: 'none',
                background: 'inherit',
                borderRadius: 'initial',
                padding: 'initial',
                outline: 'none'
              }}
              onClick={this.handleNextPage}
            >
              <img
                src={ForwardArrow}
                alt='forward-arrow'
                style={{ width: '1.5em' }}
              />
            </button>
          </footer>
        </div>
      </React.Fragment>
    )
  }
}

export default CustomTable
