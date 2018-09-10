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
import { Typography, Paper, Divider, colors } from '@material-ui/core'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10
  },
  referenceActive: {
    backgroundColor: '#ffffb3'
  },
  headerReference: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 4,
    userSelect: 'none',

    '& .nf-commentami-marker': {
      position: 'absolute',
      lineHeight: 3.5,
      cursor: 'pointer'
    },

    '& h1': {
      marginLeft: theme.spacing.unit * 4,
      marginRight: theme.spacing.unit * 4
    }
  },
  reference: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center',
    userSelect: 'none',

    '& .nf-commentami-marker': {
      position: 'absolute',
      cursor: 'pointer'
    },

    '& p': {
      marginLeft: theme.spacing.unit * 4,
      marginRight: theme.spacing.unit * 4
    }
  },
  divider: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 3
  },
  boldText: {
    color: colors.deepOrange[500],
    fontWeight: 'bold'
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
    const { classes } = this.props

    return (
      <DeepLinkController>
        <SidebarsController>
          <Resource resource="titus-demo-comments" service={service}>
            <Paper elevation={1} className={classes.root}>
              <Reference
                reference="reference-1"
                className={classes.headerReference}
                activeClassName={classes.referenceActive}
              >
                <Typography variant="display1" gutterBottom>
                  Commentable title of commentable sections
                </Typography>
              </Reference>

              <Divider className={classes.divider} />

              <Reference
                reference="reference-2"
                className={classes.reference}
                activeClassName={classes.referenceActive}
              >
                <Typography gutterBottom>
                  <span className={classes.boldText}>
                    Comment this section! Double click to comment!
                  </span>{' '}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  in justo id lorem venenatis facilisis. Morbi dictum euismod
                  ipsum et convallis. Cras diam dui, maximus eu posuere et,
                  pulvinar ac lorem. In hac habitasse platea dictumst. Phasellus
                  venenatis eget sem vitae auctor.
                </Typography>
              </Reference>

              <Divider className={classes.divider} />

              <Reference
                reference="reference-3"
                className={classes.reference}
                activeClassName={classes.referenceActive}
              >
                <Typography gutterBottom>
                  <span className={classes.boldText}>
                    Comment this section! Click on the icon to the left!
                  </span>{' '}
                  More Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum convallis, nulla id bibendum ornare, leo erat
                  faucibus ligula, vel ullamcorper nibh nisi in arcu. Donec
                  lobortis sapien nec pretium auctor. Aenean vulputate odio
                  nulla, quis facilisis est viverra et.
                </Typography>
              </Reference>
            </Paper>

            <Sidebar />
          </Resource>
        </SidebarsController>
      </DeepLinkController>
    )
  }
}

export default withStyles(styles)(Comments)
