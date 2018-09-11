import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { IconButton } from '@material-ui/core'
import { loadAllDietTypes, toggleDietTypeVisibility } from './queries.graphql'

export const ToggleButton = ({ id, children }) => (
  <Mutation mutation={toggleDietTypeVisibility}>
    {toggleDietTypeVisibility => (
      <IconButton
        aria-label="Visibility Toggle"
        onClick={e =>
          toggleDietTypeVisibility({
            variables: { id },
            update: (
              cache,
              {
                data: {
                  toggleDietTypeVisibility: { id }
                }
              }
            ) => {
              const data = cache.readQuery({
                query: loadAllDietTypes
              })

              data.allDietTypes = data.allDietTypes.map(
                dietType =>
                  dietType.id === id
                    ? {
                        ...dietType,
                        visible: !dietType.visible
                      }
                    : dietType
              )

              cache.writeQuery({
                query: loadAllDietTypes,
                data
              })
            }
          })
        }
      >
        {children}
      </IconButton>
    )}
  </Mutation>
)

ToggleButton.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default ToggleButton
