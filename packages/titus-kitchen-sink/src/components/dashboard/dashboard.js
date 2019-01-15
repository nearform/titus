import React from 'react'
import Typography from '@material-ui/core/Typography'

// Short term, should be removed and a grid used instead.
const divStyle = {
  maxWidth: '960px'
}

const Dashboard = () => (
  <div style={divStyle}>
    <Typography variant="h3" gutterBottom>Dashboard</Typography>
    <Typography paragraph>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
      atque.
    </Typography>
    <Typography variant="h4" gutterBottom>Titus</Typography>
    <Typography paragraph>
      Titus is an opinionated sample application, created to showcase how we think about and develop software
      at <a href="https://nearform.com" target="_blank" rel="noreferrer noopener">NearForm</a>.
      It is our belief that the mark of successful software is the reuse of common patterns and practices which
      have proven track records in production software. We are less caring about the minute of technical options
      available; instead preferring to look at the measure of value gained from the lens of a product owner or end
      user.
    </Typography>
    <Typography variant="h4" gutterBottom>Making use of Titus</Typography>
    <Typography paragraph>
      Titus is not a singular app with a singular purpose, rather, it is a collection of Journeys composed
      together. A Journey
      is best thought of as a mini app with a singular function. Each Journey has been selected based on real
      world features we
      have developed. Often the biggest slow down in delivery of real value is having to reinvent the wheel over
      and over.
    </Typography>
    <Typography paragraph>
      Titus works like a style guide for software patterns and processes. Each sub section of the app contains a
      Journey through
      one of these patterns or processes. These Journeys are wrapped in a neat shell, powered by a backend server,
      and deployed as
      a full application to a real cloud service. In this way, we can demonstrate, not only popular Journey&#39;s
      product owners are
      likely to encounter, but also how to combine these journeys into a cohesive application that can be deployed
      using modern
      best practices.
    </Typography>
    <Typography variant="h4" gutterBottom>As a Starter Kit</Typography>
    <Typography paragraph>
      We have built Titus with reuse in mind. No singular kit could hope to cover all possibilities. Instead we
      encourage you to take
      the bits you need and drop the parts you don&#39;t. Titus should be looked at as an accelerator, not as a
      set of rules or patterns
      that must be followed in an all or nothing scenario.
    </Typography>
    <Typography paragraph>
      For example, perhaps you already have a rock solid Frontend Application built and deployed and are looking
      for a best practice backend
      that handles containerization, deployment and data migration. Or perhaps you would simply like to make use
      of some of the useful frontend
      journeys we have developed. We encourage you to mix and match as you needed.
    </Typography>
    <Typography variant="h4" gutterBottom>As Reference Architecture</Typography>
    <Typography paragraph>
      Although Titus is a collection of Journeys. We have composed these Journeys into a full fledged application.
      This app includes the following
      features that make it a great reference Architecture for many classes of project.
    </Typography>

    <ul>
      <li><Typography>Production grade login functionality built on top of Auth0</Typography></li>
      <li><Typography>API Auditing via Commentami</Typography></li>
      <li><Typography>Database migration functionality built on top of PostgresSql and Postgater</Typography></li>
      <li><Typography>Todo: add more</Typography></li>
    </ul>
    <Typography variant="h4" gutterBottom>Whats included</Typography>

    <ul>
      <li><Typography>Custom React components built on top of material-ui components and third party
        libraries</Typography></li>
      <li><Typography>Community open source frontend and backend libraries that we use in our own production level
        projects</Typography></li>
      <li><Typography>
        NearForm&#39;s own open source projects, including <a href="https://github.com/nearform/udaru"
                                                              target="_blank"
                                                              rel="noreferrer noopener">udaru</a>,&nbsp;
        <a href="https://github.com/nearform/commentami" target="_blank"
           rel="noreferrer noopener">commentami</a> and&nbsp;
        <a href="https://github.com/nearform/react-table" target="_blank"
           rel="noreferrer noopener">react-table</a>
      </Typography>
      </li>
      <li><Typography>Add some more...</Typography></li>
    </ul>

  </div>
)

export default Dashboard
