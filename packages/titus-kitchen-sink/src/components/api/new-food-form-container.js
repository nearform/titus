import { compose, graphql } from 'react-apollo'
import { createFood, loadFoodData } from './lib/utils'
import NewFoodForm from './new-food-form'

const enhance = compose(
  graphql(loadFoodData, { name: 'loadFoodData' }),
  graphql(createFood, { name: 'createFood' })
)

export default enhance(NewFoodForm)
