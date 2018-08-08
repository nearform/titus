import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Cancel from '@material-ui/icons/Cancel'
import Typography from '@material-ui/core/Typography'

import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

import UploadStatus from './atoms/UploadStatus'

const colorBase = '#222222ef'
const colorProgress = '#207339ef'

const styles = {
  tile: {
    width: 245,
    height: 300,
    border: `2px solid ${colorBase}`
  },
  complete: { border: `2px solid ${colorProgress}` },
  media: {
    objectFit: 'cover',
    width: '245px',
    height: '300px'
  },
  bar: {
    padding: '2px',
    backgroundColor: '#ff0000dd'
  }
}

const StyledGridListTileBar = withStyles({
  titleWrapActionPosRight: {
    marginLeft: '2px'
  },

  actionIcon: {
    color: 'white'
  }
})(GridListTileBar)

const NoPreview = withStyles({
  root: {
    height: '240px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})(({ classes }) => (
  <div className={classes.root}>
    <Typography variant='title'>No Preview Available</Typography>
  </div>
))

const DisplayCard = ({
  classes,
  uploadProgress,
  title,
  name,
  size,
  mediaImage,
  onAbortUpload
}) => (
  <GridListTile
    className={`${classes.tile} ${
      uploadProgress === 100 ? classes.complete : ''
    }`}
  >
    {mediaImage && (
      <img className={classes.media} title={title || name} src={mediaImage} />
    )}
    {!mediaImage && <NoPreview />}
    <StyledGridListTileBar
      className={classes.bar}
      title={title || name}
      subtitle={<UploadStatus size={size} progress={uploadProgress} />}
      actionIcon={
        // FIXME the upload abort is currently disabled. It's required to figure out what to do with
        // aborted items that continue to upload (is not possible to abort an http request, only multipart can be aborted)
        // Probably a backend functionality is required to clean up the file
        uploadProgress < 100 ? <Cancel onClick={onAbortUpload} /> : <div />
      }
      style={{
        background: `linear-gradient(to right, ${colorProgress} ${uploadProgress}%, ${colorBase} ${uploadProgress}%, ${colorBase} ${100 -
          uploadProgress}%)`
      }}
    />
  </GridListTile>
)

DisplayCard.propTypes = {
  classes: PropTypes.object,
  uploadProgress: PropTypes.any,
  title: PropTypes.any,
  name: PropTypes.any,
  mediaImage: PropTypes.any,
  size: PropTypes.number,
  onAbortUpload: PropTypes.func
}

export default withStyles(styles)(DisplayCard)
