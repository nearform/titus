import React from 'react'
import Typography from '@material-ui/core/Typography'

const Dashboard = () => (
  <div>
    <Typography variant="display1" gutterBottom>Titus</Typography>
    <Typography paragraph variant="body2">
      Titus is a sample application created to showcase how we develop software at <a href="https://nearform.com" target="_blank" rel="noreferrer noopener">NearForm</a>.
    </Typography>
    <Typography paragraph variant="body2">
      Here you will find several pages containing example usages of:
    </Typography>
    <ul>
      <li>custom React components built on top of material-ui components and third party libraries</li>
      <li>community open source frontend and backend libraries that we use in our own projects</li>
      <li>
        NearForm's open source projects, like<a href="https://github.com/nearform/react-table" target="_blank" rel="noreferrer noopener">react-table</a>
      </li>
    </ul>
  </div>
)

export default Dashboard
