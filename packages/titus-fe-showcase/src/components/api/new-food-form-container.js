import { compose, graphql } from 'react-apollo'
import { createFood, loadFoodData } from './lib/data'
import NewFoodForm from './new-food-form'

const enhance = compose(
  graphql(loadFoodData, { name: 'loadFoodData' }),
  graphql(createFood, { name: 'createFood' })
)

export default enhance(NewFoodForm)
