import React from 'react'

export const FileUploaderContext = React.createContext('file-uploader')

export function withFileUploader(Component) {
  return function FileUploaderComponent(props) {
    return (
      <FileUploaderContext.Consumer>
        {state => <Component {...props} fileUploader={state} />}
      </FileUploaderContext.Consumer>
    )
  }
}
