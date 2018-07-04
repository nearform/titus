import React from 'react'
import PropTypes from 'prop-types'

class HeadlessWizard extends React.Component {
  static propTypes = {
    steps: PropTypes.arrayOf(PropTypes.element).isRequired, // the WizardSteps
    children: PropTypes.func.isRequired, // the ui render prop
    defaultRequiredMessage: PropTypes.string,
    onFinish: PropTypes.func,
    title: PropTypes.string,
    finishedMessage: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = this.getInitialState()
  }

  handleSatisfied = (stepIndex, stepSatisfied) => {
    this.setState(({ stepsSatisfied }) => {
      stepsSatisfied[stepIndex] = stepSatisfied
      return { stepsSatisfied: stepsSatisfied }
    })
  }

  handleDataChanged = (stepIndex, stepData) => {
    this.setState(({ steps, stepsData, stepsInfo }) => {
      stepsData[stepIndex] = stepData

      // reset the data prop on the wizard step object
      steps[stepIndex] = React.cloneElement(steps[stepIndex], {
        data: stepsData[stepIndex]
      })

      // if a wizard step requires the rest of the step data e.g. a summary step
      // or step that clones data e.g. billing->shipping, this might be useful
      stepsInfo.forEach((stepInfo, index) => {
        if (stepInfo.stepsDataRequired) {
          steps[index] = React.cloneElement(steps[index], {
            stepsData: stepsData
          })
        }
      })
      return { stepsData: stepsData, steps: steps }
    })
  }

  wireEventsAndAddProps = (steps, stepsInfo, stepsData) => {
    const { handleDataChanged, handleSatisfied } = this
    return React.Children.map(steps, (step, stepIndex) =>
      React.cloneElement(step, {
        stepIndex,
        stepsInfo,
        stepsData,
        data: {},
        handleDataChanged,
        handleSatisfied
      })
    )
  }

  getInitialState () {
    const { steps } = this.props // react WizardSteps components

    const stepsSatisfied = []
    const stepsData = []
    const stepsInfo = []

    React.Children.forEach(steps, step => {
      const {
        id,
        title,
        description,
        required,
        requiredMessage,
        stepsDataRequired
      } = step.props
      stepsInfo.push({
        id,
        title,
        description,
        required,
        requiredMessage,
        stepsDataRequired
      })
      stepsSatisfied.push(false)
      stepsData.push({})
    })

    const newState = {
      numSteps: stepsInfo.length,
      stepIndex: 0,
      stepsData, // collecting step form data
      stepsSatisfied, // current step satisfied
      stepsInfo, // props data for convenience
      requiredMessage: '', // current steps required message
      finished: false
    }

    newState.steps = this.wireEventsAndAddProps(steps, stepsInfo, stepsData)

    return newState
  }

  next = () => {
    this.setState(prevState => {
      const {
        stepsSatisfied,
        stepIndex,
        numSteps,
        stepsInfo,
        stepsData
      } = prevState
      const {
        defaultRequiredMessage = 'Data required to continue',
        onFinish
      } = this.props

      const stepInfo = stepsInfo[stepIndex]

      let requiredMessage = ''
      let newStepIndex = stepIndex
      if (stepInfo.required && !stepsSatisfied[stepIndex]) {
        requiredMessage = stepInfo.requiredMessage
          ? stepInfo.requiredMessage
          : defaultRequiredMessage
      } else {
        newStepIndex++ // move on if step satified or optional
      }

      let finished = false
      if (newStepIndex === numSteps) {
        finished = true
        if (onFinish) onFinish({ stepsInfo, stepsData })
      }

      return {
        stepIndex: newStepIndex,
        requiredMessage,
        finished
      }
    })
  }

  back = () => {
    this.setState(({ stepIndex }) => ({
      stepIndex: stepIndex - 1,
      requiredMessage: ''
    }))
  }

  reset = () => {
    this.setState(this.getInitialState())
  }

  render () {
    // children of headless-wizard is the default render prop ui for wizard
    // the actual wizard steps are passed in via steps prop and mutated and put into state on init
    const {
      props: { title, finishedMessage = 'Finished', children },
      state: {
        steps,
        numSteps,
        stepIndex,
        stepsData,
        stepsSatisfied,
        stepsInfo,
        requiredMessage,
        finished
      },
      next,
      back,
      reset
    } = this

    return children({
      props: {
        title,
        finishedMessage
      },
      state: {
        steps,
        numSteps,
        stepIndex,
        stepsData,
        stepsSatisfied,
        stepsInfo,
        requiredMessage,
        finished
      },
      events: {
        next,
        back,
        reset
      }
    })
  }
}

export default HeadlessWizard
