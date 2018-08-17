import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend-filedrop'

import { v4 } from 'uuid'

const getAsEntry = item =>
  item.getAsEntry
    ? item.getAsEntry()
    : item.webkitGetAsEntry ? item.webkitGetAsEntry() : null

class UploadFileDescriptor {
  constructor (file, idSuffix, isDirectory) {
    this.id = `file-${idSuffix}-${v4()}`
    this.name = file.name
    this.type = file.type
    this.orig = file
    this.isDirectory = isDirectory
  }
}

export const getFilesFromFileDataTransfer = (dataTransfer, forceFileType) => {
  return Promise.resolve().then(() => {
    if (
      !dataTransfer ||
      !dataTransfer.files ||
      dataTransfer.files.length === 0
    ) {
      return []
    }
    const promises = []

    for (let i = 0; i < dataTransfer.files.length; i++) {
      const dtItem = dataTransfer.files[i]
      promises.push(new UploadFileDescriptor(dtItem, i, forceFileType ? false : getAsEntry(dataTransfer.items[i]).isDirectory))
    }

    return Promise.all(promises).then(files => [].concat(...files))
  })
}

const uploadTarget = {
  drop (props, monitor, component) {
    if (monitor.didDrop()) {
      return
    }

    const item = monitor.getItem()
    getFilesFromFileDataTransfer(item.dataTransfer)
      .then(files => {
        component.handleFilesUpdate(files)
      })
      .catch(console.error)

    return { moved: true }
  },
  canDrop () {
    return true
  }
}

function collect (connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

export default DropTarget([NativeTypes.FILE], uploadTarget, collect)
