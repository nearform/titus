import React from 'react'
import Typography from '@material-ui/core/Typography'

const divStyle = {
  maxWidth: '960px'
}

const Dashboard = () => (
  // eslint-disable-next-line
  <div style={divStyle}>
    <Typography variant="display3" gutterBottom>Titus</Typography>
    <Typography paragraph variant="body2">
      Titus is an opinionated sample application, created to showcase how we think about and develop software at <a href="https://nearform.com" target="_blank" rel="noreferrer noopener">NearForm</a>. It is 
      our belief that the mark of successful software is the reuse of common patterns and practices which have proven track records in production software. We are less caring about the minute of technical options
      available; instead preferring to look at the measure of value gained from the lens of a product owner or end user.
    </Typography>
    <Typography variant="display1" gutterBottom>How to use Titus</Typography>
    <Typography paragraph variant="body2">
      Titus works like a style guide for software patterns and processes. Each sub section of the app contains a Journey through 
      one of these patterns or processes. These Journeys are wrapped in a neat shell, powered by a backend server, and deployed as 
      a full application to a real cloud service. In this way, we can demonstrate, not only popular Journey&#39;s product owners are 
      likely to encounter, but also how to combine these journeys into a cohesive application that can be deployed using modern 
      best practices.
    </Typography>
    <Typography variant="display2" gutterBottom>Journeys</Typography>
    <Typography paragraph variant="body2">
      A Journey is best thought of as a mini app with a singular function. Each Journey has been selected based on real world features we have 
      developed. Often the biggest slow down in delivery of real value is having to reinvent the wheel over and over.
    </Typography>
    <ul>
      <li>Custom React components built on top of material-ui components and third party libraries</li>
      <li>Community open source frontend and backend libraries that we use in our own production level projects</li>
      <li>
        NearForm&#39;s own open source projects, including <a href="https://github.com/nearform/udaru" target="_blank" rel="noreferrer noopener">udaru</a>,&nbsp;
        <a href="https://github.com/nearform/commentami" target="_blank" rel="noreferrer noopener">commentami</a> and&nbsp;
        <a href="https://github.com/nearform/react-table" target="_blank" rel="noreferrer noopener">react-table</a>
      </li>
    </ul>
    <Typography variant="display1" gutterBottom>As a Starter Kit</Typography>
    <Typography paragraph variant="body2">
      We have built Titus with reuse in mind. No singular kit could hope to cover all possibilities. Instead we encourage you to take the bits you need
      and drop the parts you don&#39;t. Titus should be looked at as an accelerator, not as a set of rules.
    </Typography>
  </div>
)

export default Dashboard
