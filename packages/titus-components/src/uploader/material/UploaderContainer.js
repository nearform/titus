import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'

import { withFileUploader } from '../FileUploaderContext'
import UploadDisplayCard from '../headless/UploadDisplayCard'
import DropAreaCard from '../headless/DropAreaCard'

import DropArea from './DropArea'
import DisplayCard from './DisplayCard'

const styles = {
  gridList: {
    width: '100%'
  }
}

const Spacer = ({ children }) => (
  <div style={{ marginBottom: '10px', marginRight: '10px' }}>{children}</div>
)

Spacer.propTypes = {
  children: PropTypes.any
}

const getUploaderTitle = maxItems =>
  `To upload drag your file${maxItems > 1 ? 's' : ''}`

const getUploaderText = (maxItems, currentItems) =>
  maxItems > 1 ? `Uploaded ${currentItems} of ${maxItems}` : ''

const UploaderContainerBase = props => (
  <div>
    <GridList cellHeight={180} className={props.classes.gridList}>
      {props.fileUploader.files.map(file => {
        return (
          <Spacer>
            <UploadDisplayCard
              fileUploader={props.fileUploader}
              file={file}
              DisplayCardComponent={DisplayCard}
            />
          </Spacer>
        )
      })}
      {props.fileUploader.files.length < props.maxItems && (<Spacer>
        <DropAreaCard
          fileUploader={props.fileUploader}
          title={getUploaderTitle(
            props.maxItems,
            props.fileUploader.files.length
          )}
          text={getUploaderText(
            props.maxItems,
            props.fileUploader.files.length
          )}
          DropAreaComponent={DropArea}
        />
      </Spacer>)}
    </GridList>
  </div>
)

UploaderContainerBase.propTypes = {
  classes: PropTypes.object,
  fileUploader: PropTypes.object,
  maxItems: PropTypes.number
}

export default withStyles(styles)(withFileUploader(UploaderContainerBase))
