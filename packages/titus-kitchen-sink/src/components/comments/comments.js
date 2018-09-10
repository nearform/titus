import React from 'react'
import PropTypes from 'prop-types'
import 'regenerator-runtime/runtime'
import { withStyles } from '@material-ui/core/styles'
import {
  Reference,
  SidebarsController,
  DeepLinkController
} from '@nearform/commentami-react-components/dist/ui'
import {
  Resource,
  WebsocketService,
  buildWebsocketClient
} from '@nearform/commentami-react-components'
import Sidebar from './sidebar'

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
  constructor(props) {
    super(props)

    this.state = {
      client: null,
      service: null
    }
  }

  async componentDidMount() {
    const client = buildWebsocketClient(process.env.REACT_APP_COMMENTS_ENDPOINT)

    try {
      await client.connect({
        auth: {
          headers: {
            authorization: `Basic ${Buffer.from(`john:john`).toString(
              'base64'
            )}`
          }
        }
      })
    } catch (error) {
      console.error(error)
    }

    this.setState({
      client,
      service: WebsocketService(client)
    })
  }

  async componentWillUnmount() {
    if (this.state.client) {
      await this.state.client.disconnect()
    }
  }

  static propTypes = {
    classes: PropTypes.object
  }

  render() {
    const { service } = this.state
    const { reference, referenceActive } = this.props.classes

    return (
      <DeepLinkController>
        <SidebarsController>
          <Resource resource="titus-demo-comments" service={service}>
            <Reference
              reference="reference-1"
              className={reference}
              activeClassName={referenceActive}
            >
              <h1>Commentable title of commentable sections</h1>
            </Reference>
            <Reference
              reference="reference-2"
              className={reference}
              activeClassName={referenceActive}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                in justo id lorem venenatis facilisis. Morbi dictum euismod
                ipsum et convallis. Cras diam dui, maximus eu posuere et,
                pulvinar ac lorem. In hac habitasse platea dictumst. Phasellus
                venenatis eget sem vitae auctor.
              </p>
            </Reference>
            <Reference
              reference="reference-3"
              className={reference}
              activeClassName={referenceActive}
            >
              <p>A bit more of text that is commentable</p>
            </Reference>
            <Sidebar />
          </Resource>
        </SidebarsController>
      </DeepLinkController>
    )
  }
}

export default withStyles(styles)(Comments)
