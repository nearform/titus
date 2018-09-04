import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
// import Cancel from '@material-ui/icons/Cancel'
import Delete from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'

import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

import UploadStatus from './atoms/UploadStatus'

const colorBase = '#222222ef'
const colorProgress = '#737072ef'
const colorError = '#FF0000dd'
const colorDone = '#238F2Cef'

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
    padding: '2px'
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
  <div className={classes.root} data-testid="display-card-no-preview">
    <Typography variant="title">No Preview Available</Typography>
  </div>
))

const DisplayCard = ({
  classes,
  uploadProgress,
  title,
  name,
  size,
  // onAbortUpload,
  mediaImage,
  error,
  done,
  onRemove
}) => (
  <GridListTile
    className={`${classes.tile} ${
      uploadProgress === 100 ? classes.complete : ''
    }`}
  >
    {mediaImage && (
      <img
        className={classes.media}
        title={title || name}
        src={mediaImage}
        alt="media"
      />
    )}
    {!mediaImage && <NoPreview />}
    <StyledGridListTileBar
      className={classes.bar}
      title={title || name}
      subtitle={
        error || (
          <UploadStatus size={size} progress={uploadProgress} done={done} />
        )
      }
      style={{
        background: error
          ? colorError
          : done
            ? colorDone
            : `linear-gradient(to right, ${colorProgress} ${uploadProgress}%, ${colorBase} ${uploadProgress}%, ${colorBase} ${100 -
                uploadProgress}%)`
      }}
      {...(error
        ? {
            actionIcon: <Delete onClick={onRemove} />
          }
        : {})}
    />
  </GridListTile>
)

/*
  // FIXME the upload abort is currently disabled. It's required to figure out what to do with
  // aborted items that continue to upload (is not possible to abort an http request, only multipart can be aborted)
  // Probably a backend functionality is required to clean up the file
  // The following snippet should be added to StyledGridListTileBar component
  actionIcon={
    uploadProgress < 100 ? <Cancel onClick={onAbortUpload}/> : <div />
  }
*/

DisplayCard.propTypes = {
  classes: PropTypes.object,
  uploadProgress: PropTypes.any,
  title: PropTypes.any,
  name: PropTypes.any,
  mediaImage: PropTypes.any,
  // onAbortUpload: PropTypes.func,
  size: PropTypes.number,
  done: PropTypes.bool,
  error: PropTypes.string,
  onRemove: PropTypes.func
}

export default withStyles(styles)(DisplayCard)
