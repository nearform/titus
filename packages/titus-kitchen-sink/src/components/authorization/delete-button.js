import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { IconButton } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { deleteDietType, loadAllDietTypes } from './lib/data'

const update = (cache, { data: { deleteDietType: { id } } }) => {
  const data = cache.readQuery({
    query: loadAllDietTypes
  })

  data.allDietTypes = data.allDietTypes.filter(
    ({ id: identifier }) => identifier !== id
  )
  cache.writeQuery({
    query: loadAllDietTypes,
    data
  })
}

export const DeleteButton = ({ id }) => (
  <Mutation mutation={deleteDietType}>
    {deleteDietType => (
      <IconButton
        aria-label="Delete"
        onClick={() => deleteDietType({
          variables: { id },
          update
        })
        }
      >
        <DeleteIcon/>
      </IconButton>
    )}
  </Mutation>
)

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired
}

export default DeleteButton
