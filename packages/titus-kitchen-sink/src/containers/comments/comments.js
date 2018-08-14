import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
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

const styles = theme => ({
  referenceActive: {
    backgroundColor: '#ffffb3'
  },
  reference: {
    position: 'relative',
    '& .nf-commentami-marker': {
      position: 'absolute',
      top: '6px',
      left: '-24px'
    }
  }
})

class Comments extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      client: null,
      service: null
    }
  }

  async componentDidMount () {
    const client = buildWebsocketClient(process.env.REACT_APP_COMMENTS_ENDPOINT)
    await client.connect(/* if you need authentication: { auth: ... } */)

    this.setState({
      client,
      service: WebsocketService(client)
    })
  }

  async componentWillUnmount () {
    await this.state.client.disconnect()
  }

  static propTypes = {
    classes: PropTypes.object
  }

  render () {
    return (
      <SidebarsController>
        <Resource resource='titus-demo-comments' service={this.state.service}>
          <Reference reference='reference-1' className={this.props.classes.reference} activeClassName={this.props.classes.referenceActive}>
            <h1>Commentable title of commentable sections</h1>
          </Reference>
          <Reference reference='reference-2' className={this.props.classes.reference} activeClassName={this.props.classes.referenceActive}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in justo id lorem venenatis facilisis. Morbi dictum euismod ipsum et convallis. Cras diam dui, maximus eu posuere et, pulvinar ac lorem. In hac habitasse platea dictumst. Phasellus venenatis eget sem vitae auctor.</p>
          </Reference>
          <Reference reference='reference-3' className={this.props.classes.reference} activeClassName={this.props.classes.referenceActive}>
            <p>A bit more of text that is commentable</p>
          </Reference>
          <Sidebar />
        </Resource>
      </SidebarsController>
    )
  }
}

export default withStyles(styles)(Comments)
