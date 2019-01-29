import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'regenerator-runtime/runtime'
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
import { PageHeading } from '../utils'
import {
  Typography,
  Paper,
  Divider,
  colors,
  Grid,
  withStyles
} from '@material-ui/core'
import { UserChooser, Sidebar } from './'

const MORE_INFO = 'More info dialog content'
const SUB_HEADER =
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.'

const data = {
  'John Smith': {
    username: 'john',
    password: 'john'
  },
  'Jane Doe': {
    username: 'jane',
    password: 'jane'
  },
  'Titus User': {
    username: 'titus',
    password: 'titus'
  }
}
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
  },
  chooseContainer: {
    marginBottom: theme.spacing.unit * 6
  }
})

class Comments extends Component {
  static defaultProps = {
    users: ['John Smith', 'Jane Doe', 'Titus User']
  }

  state = {
    client: null,
    service: null,
    user: this.props.users && this.props.users[0]
  }

  async componentDidMount() {
    this.connect()
  }

  async componentWillUnmount() {
    this.disconnect()
  }

  connect = async () => {
    const client = buildWebsocketClient(process.env.REACT_APP_COMMENTS_ENDPOINT)

    try {
      const { user } = this.state
      const { username, password } = data[user]
      await client.connect({
        auth: {
          headers: {
            authorization: `Basic ${Buffer.from(
              `${username}:${password}`
            ).toString('base64')}`
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

  disconnect = async () => {
    if (this.state.client) {
      await this.state.client.disconnect()
    }
  }

  handleUserChange = async user => {
    this.setState({ user }, () => this.disconnect().then(this.connect))
  }

  render() {
    const { service } = this.state
    const { users, classes } = this.props

    return (
      <Grid container spacing={24}>
        <PageHeading
          header="Comments"
          subHeader={SUB_HEADER}
          moreInfo={MORE_INFO}
        />
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <DeepLinkController>
            <SidebarsController>
              <Resource resource="titus-demo-comments" service={service}>
                <Paper elevation={1} className={classes.root}>
                  <Grid
                    container
                    justify="flex-end"
                    alignItems="baseline"
                    className={classes.chooseContainer}
                  >
                    <Typography gutterBottom color="textSecondary">
                      Change The User:
                    </Typography>
                    <UserChooser
                      values={users}
                      onChange={this.handleUserChange}
                    />
                  </Grid>

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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Proin in justo id lorem venenatis facilisis. Morbi dictum
                      euismod ipsum et convallis. Cras diam dui, maximus eu
                      posuere et, pulvinar ac lorem. In hac habitasse platea
                      dictumst. Phasellus venenatis eget sem vitae auctor.
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
                      More Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Vestibulum convallis, nulla id bibendum ornare, leo
                      erat faucibus ligula, vel ullamcorper nibh nisi in arcu.
                      Donec lobortis sapien nec pretium auctor. Aenean vulputate
                      odio nulla, quis facilisis est viverra et.
                    </Typography>
                  </Reference>
                </Paper>

                <Sidebar />
              </Resource>
            </SidebarsController>
          </DeepLinkController>
        </Grid>
      </Grid>
    )
  }
}

Comments.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(Comments)
