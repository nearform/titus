# Titus Wizard

The Wizard component allows users tie a series of UI forms together gathering data for each step.

Applications can subscribe to the `onFinish` event, at which point, all of the data and step information are returned for processing e.g. post info to back end api

## Components

It is made up of the following key components:

- `<Wizard>` The main component, which renders a HeadlessWizard Component and the render prop UI (MaterialWizard).
- `<HeadlessWizard>` This is where the central non-ui functionality resides
- `<MaterialWizard>` Our implentation of the Wizard's UI using MaterialUi render prop

## Demo

In titus-kitchen-sink there is a demo of how to use the Wizard component. It shows a simple Wizard with 6 WizardSteps that rendering 2 sample components `<SimpleStep>` and `<SummaryStep>`, both of which supply props to the wizard and are dynamically wired up by the Wizard with data and events. In a real application, each step would most likely have its own component that conform to the Wizard implementation.

This demonstrates how to set up the Wizard with steps and wires up the events such as handleSatisfied and handleDataChanged.

## Configuration

The `<Wizard>` component takes the following props:

- `title` The wizards title
- `finishedMessage` The message to display on finish
- `defaultRequiredMessage` A default message to display on a required step
- `children` The series of `<WizardStep>` components

Each step component should:

- Set up the basic properties:
  - `id` an id used to identify the step
  - `title` title of the step
  - `description` description of the step
  - `required` boolean indicating if the step data is required (defaults to false)
  - `requiredMessage` if required, this message is displayed if the step is not satisfied
  - `stepsDataRequired` if a component needs information from other steps, it will received them in the stepsData prop
- Accept/use props from the wizard including:
  - `stepIndex` an auto-assigned index
  - `data` wizard state data for this step
  - `stepsData` all of the steps data (handy for summary form or, autofill e.g. billing->shipping). Only passed through if stepsDataRequired is set
  - `stepsInformation` e.g. all of the information about steps (essentially the steps individual props in an array)
  - `handleSatisfied` Event to raise when step is satisfied (to allow progression to next step)
  - `handleDataChanged` Event to raise when data changes (to allow wizard to update the state for this step)

## Basic Pseudo Example

```html
<Wizard
    onFinish={event-handler}
    title='Wizard Example'
    finishedMessage='Finished'
    defaultRequiredMessage='Please enter data'
    >
    <StepComponent-1
        id='step1'
        title='Step 1'
        description='Enter some data'
        required={false}
    >
        {your-form-as-render-prop}
    </StepComponent-1>
    <StepComponent-2
        id='step2'
        title='Step 2'
        description='Enter some more data'
        required={true}
        requiredMessage='You must enter some data'
    >
        {your-form-as-render-prop}
    </StepComponent-2>
    :
    <StepComponent-N
        id='step2'
        title='Step 2'
        description='Enter some more data'
        required={true}
        requiredMessage='You must enter some data'
        {your-form-as-render-prop}
    >
    </StepComponent-N>

</Wizard>
```
