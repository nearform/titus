import React from 'react'
import { Wizard } from '@nearform/titus-components'
import SimpleStep from './simple-step'
import SummaryStep from './summary-step'

class WizardDemo extends React.Component {
  handleFinish = data => {
    console.log('Wizard Finished: ', data)
  }

  renderSimpleStep = props => <SimpleStep {...props} />
  renderSummaryStep = props => <SummaryStep {...props} />

  render() {
    return (
      <Wizard
        onFinish={this.handleFinish}
        title="Wizard Demo"
        finishedMessage="Congrats Gandalf!!! time to blow
        some smoke rings ô¿ô"
        defaultRequiredMessage="You Shall Not Pass (without entering a comment)!"
      >
        <SimpleStep
          id="step1"
          title="Frodo"
          description="Get Frodo to Agree"
          required={false}
        />
        <SimpleStep
          id="step2"
          title="Assemble Fellowship"
          description="Meet up with Aragorn, Legolas and Gimli"
          required
          requiredMessage="A comment is required (AND MY AXE!)"
        />
        <SimpleStep
          id="step3"
          title="Minas Tirith"
          description="Get through Minis Tirith, if in doubt, use your nose!"
        />
        <SimpleStep
          id="step4"
          title="Mordor"
          description="Walk into Mordor!"
          required
          requiredMessage="One does not simply walk into Mordor (without entering a comment)!"
        />
        <SimpleStep
          id="step5"
          title="Destroy the Ring"
          description="Wait for Frodo"
          required
        />
        <SummaryStep
          id="step6"
          title="Recap"
          description="A summary of the adventure..."
          required
          requiredMessage="Slide the button to bid farewell to the fellowship!"
          stepsDataRequired
        />
      </Wizard>
    )
  }
}

export default WizardDemo
