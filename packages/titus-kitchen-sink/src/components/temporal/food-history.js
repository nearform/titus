import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { loadFoodHistoryData } from './lib/data'
import { FoodHistoryTable } from './'

class FoodHistory extends PureComponent {
  render() {
    const { selectedFoodId, title, columns } = this.props

    return (
      <Query
        query={loadFoodHistoryData}
        variables={{ id: selectedFoodId }}
        skip={!selectedFoodId}
        fetchPolicy="cache-and-network"
      >
        {(props) => (
          <FoodHistoryTable
            title={title}
            columns={columns}
            {...props}
          />
        )}
      </Query>
    )
  }
}

FoodHistory.propTypes = {
  selectedFoodId: PropTypes.string,
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired
}

export default FoodHistory
