import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

import uploadImage from '../images/baseline-cloud_upload-24px.svg'

const colorBase = '#DDDDDD'
const textColor = '#333'
const errorColor = '#ff090a'

const styles = {
  tile: {
    width: 245,
    height: 300,
    border: `2px dotted ${colorBase}`
  },
  media: {
    width: '120px',
    height: '120px',
    marginTop: '60px'
  },
  bar: {
    padding: '2px',
    backgroundColor: colorBase,
    color: 'black'
  },
  error: {
    color: errorColor,
    marginTop: '3px'
  }
}

const barStyle = {
  titleWrap: {
    color: textColor
  },
  actionIcon: {
    color: 'white'
  }
}
const StylesGridListTileBar = withStyles(barStyle)(GridListTileBar)

const DropAreaBase = ({ classes, text, error, title }) => {
  return (
    <GridListTile className={classes.tile}>
      <img
        className={classes.media}
        title="Upload"
        src={uploadImage}
        alt="uploaded"
      />
      <StylesGridListTileBar
        className={classes.bar}
        title={title}
        subtitle={
          <div>
            <div>{text}</div>
            {error && <div className={classes.error}>{error}</div>}
          </div>
        }
      />
    </GridListTile>
  )
}

DropAreaBase.defaultProps = {
  title: 'Upload',
  text: 'Drag here your file'
}
DropAreaBase.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.string,
  error: PropTypes.string
}

export default withStyles(styles)(DropAreaBase)
