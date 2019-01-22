import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography, FormControlLabel, Switch, Paper, Grid, withStyles } from '@material-ui/core'
import { PageHeading } from '../utils'
import RecordSearch from './record-search'
import KeywordSearch from './keyword-search'

const MORE_INFO = 'More info dialog content'
const SUB_HEADER = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.'

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

class Search extends Component {
  static propTypes = {
    classes: PropTypes.object
  }

  state = {
    keywordSearch: false
  }

  handleChangeSearchType = () => {
    this.setState(({ keywordSearch }) => ({ keywordSearch: !keywordSearch }))
  }

  render() {
    const {
      props: { classes },
      state: { keywordSearch },
      handleChangeSearchType
    } = this
    return (
      <Grid container spacing={24}>
        <PageHeading header="Search" subHeader={SUB_HEADER} moreInfo={MORE_INFO}/>
        <Grid item xs={12} sm={12} md={12} lg={12}>
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
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.citation}>
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
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Search)
