import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Table from './table/table'

const columns = [
  {
    accessor: 'id',
    label: 'id',
    sortable: false,
    filterable: false,
    hidden: true
  },
  {
    accessor: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
    width: '50%'
  },
  {
    accessor: 'foodGroup',
    label: 'Food Group',
    sortable: true,
    filterable: true,
    width: '40%'
  },
  {
    accessor: 'foodGroupId',
    hidden: true
  },
  {
    accessor: 'button1',
    width: '5%'
  },
  {
    accessor: 'button2',
    width: '5%'
  }
]

class Api extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <Table title='API CRUD Example' columns={columns} />

        <div className={classes.citation}>
          <Typography variant='caption'>
            Nutritional information provided by:
          </Typography>
          <Typography variant='caption'>
            US Department of Agriculture, Agricultural Research Service,
            Nutrient Data Laboratory. USDA National Nutrient Database for
            Standard Reference, Release 28. Version Current: September 2015.
            Internet:{' '}
            <a href='http://www.ars.usda.gov/ba/bhnrc/ndl'>
              http://www.ars.usda.gov/ba/bhnrc/ndl
            </a>
          </Typography>
        </div>
      </div>
    )
  }
}

export default withStyles(theme => ({
  citation: {
    '& span:first-of-type': {
      marginTop: theme.spacing.unit * 3
    }
  }
}))(Api)
