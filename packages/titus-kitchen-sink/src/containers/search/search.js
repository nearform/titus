import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Paper from '@material-ui/core/Paper'
import RecordSearch from './record-search'
import KeywordSearch from './keyword-search'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 3
  },
  citation: {
    '& span:first-of-type': {
      marginTop: theme.spacing.unit * 3
    }
  }
})

class Search extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      keywordSearch: false
    }
  }

  handleChangeSearchType = () => {
    this.setState(({ keywordSearch }) => ({ keywordSearch: !keywordSearch }))
  }

  render () {
    const {
      props: { classes },
      state: { keywordSearch },
      handleChangeSearchType
    } = this
    return (
      <Fragment>
        <Paper className={classes.root}>
          <FormControlLabel
            control={
              <Switch
                checked={keywordSearch}
                onChange={handleChangeSearchType}
              />
            }
            label={keywordSearch ? 'Keyword Search' : 'RecordSearch'}
          />
          {keywordSearch ? <KeywordSearch /> : <RecordSearch />}
        </Paper>
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
      </Fragment>
    )
  }
}

export default withStyles(styles)(Search)
