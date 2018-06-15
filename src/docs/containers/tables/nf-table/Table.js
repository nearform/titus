import React from 'react'
import shortid from 'shortid'
import orderBy from 'lodash.orderby'
import conforms from 'lodash.conforms'
import { TableProvider } from './TableContext'

export class Table extends React.Component {
  state = {
    columns: this.props.columns,
    data: this.props.data.map(d => ({ ...d, _table_id: shortid.generate() })),
    total: this.props.data.length,
    pageSize: this.props.pageSize,
    currentPage: this.props.currentPage,
    selectedPage: this.props.currentPage,
    pageSizeOptions: this.props.pageSizeOptions,
    sorting: this.props.sorting,
    filtering: this.props.filtering,
    selecting: this.props.selecting,
    totalNumberOfPages: 0
  };

  static defaultProps = {
    columns: [],
    data: [],
    currentPage: 1,
    pageSize: 8,
    pageSizeOptions: [8, 16, 24, 48],
    sorting: [],
    filtering: [],
    selecting: []
  };

  setTableState = (state, cb) => this.setState(state, cb);

  setHeaderData = ({ columns = [] } = {}) => {
    if (Boolean(columns) && Array.isArray(columns)) {
      this.setState({ columns })
    }
  };

  handlePrevPage = e => {
    e && e.preventDefault()

    this.setState(state => {
      if (state.currentPage > 1) {
        const currentPage = state.currentPage - 1

        return {
          selectedPage: currentPage,
          currentPage
        }
      }
    })
  };

  handleNextPage = e => {
    e && e.preventDefault()

    this.setState(state => {
      const { total, pageSize, currentPage } = state
      const hasNextPage = currentPage < Math.ceil(total / pageSize)

      if (hasNextPage) {
        const currentPage = state.currentPage + 1

        return {
          selectedPage: currentPage,
          currentPage
        }
      }
    })
  };

  handlePageChange = e => {
    e && e.preventDefault()

    const inputValue = Number(e.target.value)

    this.setState({
      selectedPage: inputValue,
      currentPage: inputValue
    })
  };

  handlePageChangeBlur = e => {
    e && e.preventDefault()

    const inputValue = Number(e.target.value)
    const { total, pageSize } = this.state

    const isValidValue =
      inputValue !== '' &&
      Number.isInteger(inputValue) &&
      inputValue > 0 &&
      inputValue <= Math.ceil(total / pageSize)

    if (isValidValue) {
      return this.setState(state => {
        return {
          selectedPage: inputValue,
          currentPage: inputValue
        }
      })
    }

    return this.setState(state => {
      return {
        selectedPage: state.currentPage,
        currentPage: state.currentPage
      }
    })
  };

  handlePageSizeChange = e => {
    e && e.preventDefault()

    const pageSize = Number(e.target.value)

    this.setState(state => ({
      pageSize,
      currentPage: 1,
      selecting: [],
      sorting: [],
      filtering: []
    }))
  };

  handleSort = (columnAccessor, multipleSelect) => {
    return this.setState(state => {
      const { sorting } = state

      const sortedColumn = sorting.find(sort => sort.id === columnAccessor)

      return {
        sorting: [
          ...(multipleSelect
            ? sorting.filter(({ id }) => id !== columnAccessor)
            : []),
          ...[
            sortedColumn
              ? { ...sortedColumn, asc: !sortedColumn.asc }
              : { id: columnAccessor, asc: true }
          ]
        ]
      }
    })
  };

  handleFilter = (columnAccessor, value) => {
    this.setState(state => {
      const { filtering } = state

      const filteredColumn = filtering.find(({ id }) => id === columnAccessor)

      return {
        filtering: [
          ...filtering.filter(({ id }) => id !== columnAccessor),
          ...[
            filteredColumn
              ? { ...filteredColumn, value }
              : { id: columnAccessor, value }
          ]
        ]
      }
    })
  };

  handleRowSelect = rowKey => {
    this.setState(({ selecting }) => {
      if (rowKey === 'all' && selecting[0] !== 'all') {
        return {
          selecting: ['all']
        }
      }

      if (selecting[0] === 'all') {
        return {
          selecting: []
        }
      }

      const existingValue = selecting.find(s => s === rowKey)

      if (typeof existingValue === 'undefined') {
        return {
          selecting: [...selecting, rowKey]
        }
      }

      return {
        selecting: selecting.filter(s => s !== rowKey)
      }
    })
  };

  getComputedProps = () => {
    const {
      columns,
      data,
      currentPage,
      pageSize,
      sorting,
      filtering,
      selecting
    } = this.state

    if (!columns.length) return { rows: [] }

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize

    const iteratees = sorting.map(({ id }) => id)
    const orders = sorting.map(({ asc }) => (asc ? 'asc' : 'desc'))

    const filterPredicate = filtering.reduce((accum, { id, value }) => {
      accum[id] = n => n.toLowerCase().includes(value.toLowerCase())

      return accum
    }, {})

    const orderedRows = orderBy(data, iteratees, orders)
    const filteredRows = orderedRows.filter(conforms(filterPredicate))

    const rows = filteredRows.slice(start, end).map((row, rowIndex) => {
      return {
        selected:
          selecting[0] === 'all' ||
          typeof selecting.find(s => s === row._table_id) !== 'undefined',
        rowKey: row._table_id,
        rowData: columns.map(({ accessor }, columnIndex) => {
          return accessor
            ? {
              key: `${row._table_id}-${rowIndex}-${columnIndex}`,
              type: 'data-row',
              accessor,
              data: row[accessor]
            }
            : {
              type: 'empty-row',
              key: `${row._table_id}-empty-${rowIndex}-${columnIndex}`
            }
        })
      }
    })

    const totalNumberOfPages = Math.ceil(filteredRows.length / pageSize)

    return {
      rows,
      totalNumberOfPages,
      hasPrevPage: currentPage > 1,
      hasNextPage: currentPage !== totalNumberOfPages && filteredRows.length > 0
    }
  };

  getActions = () => {
    return {
      setTableState: this.setTableState,
      setHeaderData: this.setHeaderData,
      handleSort: this.handleSort,
      handleFilter: this.handleFilter,
      handleNextPage: this.handleNextPage,
      handlePrevPage: this.handlePrevPage,
      handlePageChange: this.handlePageChange,
      handlePageChangeBlur: this.handlePageChangeBlur,
      handlePageSizeChange: this.handlePageSizeChange,
      handleRowSelect: this.handleRowSelect
    }
  };

  getRenderProps = () => {
    return {
      ...this.state,
      ...this.getComputedProps(),
      ...this.getActions()
    }
  };

  render () {
    const { component, render, children } = this.props
    const props = this.getRenderProps()

    return (
      <TableProvider value={props}>
        {component
          ? React.createElement(component, props)
          : render
            ? render(props)
            : typeof children === 'function'
              ? children(props)
              : !(React.Children.count(children) === 0)
                ? React.Children.only(children)
                : null}
      </TableProvider>
    )
  }
}
