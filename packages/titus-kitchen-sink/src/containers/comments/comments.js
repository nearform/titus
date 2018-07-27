// import React, { Fragment } from 'react'
import React from 'react'
import {
  Reference,
  SidebarsController
} from '@nearform/commentami-react-components/dist/ui'

import {
  Resource,
  WebsocketService,
  buildWebsocketClient
} from '@nearform/commentami-react-components'

import { Sidebar } from './components/sidebar'

// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import CircularProgress from '@material-ui/core/CircularProgress'
// import { withStyles } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'

// import Table from './table/table'
// import { loadFood, deleteFood, updateFood, createFood, loadFoodGroups } from '../../store/api/api-actions'

class Comments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      client: null,
      service: null
    }
  }

  async componentDidMount() {
    const client = buildWebsocketClient('ws://localhost:5000')
    await client.connect(/* if you need authentication: { auth:  } */)

    this.setState({
      client,
      service: WebsocketService(client)
    })
  }

  async componentWillUnmount() {
    await this.state.client.disconnect()
  }

  // static propTypes = {
  //   loadingFood: PropTypes.bool.isRequired,
  //   loadingFoodGroups: PropTypes.bool.isRequired,
  //   error: PropTypes.any,
  //   food: PropTypes.array,
  //   createFood: PropTypes.func.isRequired,
  //   loadFood: PropTypes.func.isRequired,
  //   updateFood: PropTypes.func.isRequired,
  //   deleteFood: PropTypes.func.isRequired,
  //   foodGroups: PropTypes.array,
  //   loadFoodGroups: PropTypes.func.isRequired,
  //   classes: PropTypes.object.isRequired
  // }

  // deleteAllSelected = (rows) => {
  //   const ids = rows.map(row => row.rowData.find(r => r.accessor === 'id').data)
  //   this.props.deleteFood(ids)
  // }

  render () {
    return (
      <SidebarsController>
        <Resource resource="titus-demo-comments" service={this.state.service}>
          <Reference reference="reference-1">
            <h1>Commentable title of commentable sections</h1>
          </Reference>
          <Reference reference="reference-2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in justo id lorem venenatis facilisis. Morbi dictum euismod ipsum et convallis. Cras diam dui, maximus eu posuere et, pulvinar ac lorem. In hac habitasse platea dictumst. Phasellus venenatis eget sem vitae auctor.</p>
          </Reference>
          <Reference reference="reference-3">
            <p>A bit more of text that is commentable</p>
          </Reference>
          <Sidebar />
        </Resource>
      </SidebarsController>
    )
    // const { error, loadingFood, loadingFoodGroups, food, foodGroups, classes } = this.props

    // if (error) {
    //   return <Typography color='error' >{error}</Typography>
    // }

    // if (loadingFood || loadingFoodGroups || !food || !foodGroups) {
    //   return (
    //     <div className={classes.progressWrapper}>
    //       <CircularProgress className={classes.progress} />
    //     </div>
    //   )
    // }

    // return <Fragment>
    //   <Table
    //     title='API CRUD Example'
    //     columns={columns}
    //     food={food}
    //     foodGroups={foodGroups}
    //     onCreate={this.props.createFood}
    //     onUpdate={this.props.updateFood}
    //     onDelete={this.deleteAllSelected}
    //   />
    //   <div className={classes.citation}>
    //     <Typography variant='caption'>Nutritional information provided by:</Typography>
    //     <Typography variant='caption'>US Department of Agriculture, Agricultural Research Service, Nutrient Data Laboratory. USDA National Nutrient Database for Standard Reference, Release 28. Version Current: September 2015. Internet: <a href='http://www.ars.usda.gov/ba/bhnrc/ndl'>http://www.ars.usda.gov/ba/bhnrc/ndl</a></Typography>
    //   </div>
    // </Fragment>
  }
}

// const mapStateToProps = ({ api: { food, loadingFood, foodGroups, loadingFoodGroups, error } }) => ({
//   food,
//   loadingFood,
//   foodGroups,
//   loadingFoodGroups,
//   error
// })

// const mapDispatchToProps = {
//   createFood,
//   loadFood,
//   updateFood,
//   deleteFood,
//   loadFoodGroups
// }

// export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Api))
export default Comments
