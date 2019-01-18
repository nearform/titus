import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Typography, FormControlLabel, Switch, Paper} from '@material-ui/core'
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

  state = {
    keywordSearch: false
  }

  handleChangeSearchType = () => {
    this.setState(({keywordSearch}) => ({keywordSearch: !keywordSearch}))
  }

  render() {
    const {
      props: {classes},
      state: {keywordSearch},
      handleChangeSearchType
    } = this
    return (
      <div>
        <Typography variant="h3" gutterBottom>Search</Typography>
        <Typography paragraph>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque.
        </Typography>
        <Paper className={classes.root}>
          <FormControlLabel
            control={
              <Switch
                checked={keywordSearch}
                onChange={handleChangeSearchType}
              />
            }
            label={keywordSearch ? 'Keyword Search' : 'Record Search'}
          />
          {keywordSearch ? <KeywordSearch/> : <RecordSearch/>}
        </Paper>
        <div className={classes.citation}>
          <Typography variant="caption">
            Nutritional information provided by:
          </Typography>
          <Typography variant="caption">
            US Department of Agriculture, Agricultural Research Service,
            Nutrient Data Laboratory. USDA National Nutrient Database for
            Standard Reference, Release 28. Version Current: September 2015.
            Internet:{' '}
            <a href="http://www.ars.usda.gov/ba/bhnrc/ndl">
              http://www.ars.usda.gov/ba/bhnrc/ndl
            </a>
          </Typography>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Search)
