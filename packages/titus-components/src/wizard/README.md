# Titus Wizard

The Wizard component allows users tie a series of UI forms together gathering data for each step.

Users can subscribe to the `onFinish` event, at which point, all of the data and step information are returned for processing e.g. post info to back end api

## Components

It is made up of the following key components:

- `<Wizard>` The main component, which renders a HeadlessWizard Component and the render prop UI (MaterialWizard).
- `<HeadlessWizard>` This is the central functionality resides and the main function is to wire up the Wizard and WizardSteps events, data etc.
- `<MaterialWizard>` Our implentation of the Wizard's UI using MaterialUi render prop
- `<WizardStep>` A simple component that renders user forms (passed in as a render prop). It is dynamically wired up to receive events and data from HeadlessWizard and to pass through events to the Wizard from the users forms.

## Demo

In titus-kitchen-sink there is a demo of how to use the Wizard component. It shows a simple Wizard with 6 WizardSteps that render 2 sample render props.

This demonstrates how to set up the Wizard and WizardSteps and wire up the events such as handleSatisfied and handleDataChanged for user driven forms.

## Configuration

The `<Wizard>` component takes the following props:

- `title` The wizards title
- `finishedMessage` The message to display on finish
- `defaultRequiredMessage` A default message to display on a required step
- `children` The series of `<WizardStep>` components

Each `<WizardStep>` component should:

- Set up the basic properties:
  - `id` an id used to identify the step
  - `title` title of the step
  - `description` description of the step
  - `required` boolean indicating if the step data is required
  - `requiredMessage` if required, this message is displayed if the step is not satisfied
  - `stepsDataRequired` if a component needs information from other steps, it will received them in the stepsData prop
- Accept/use props from the wizard including:
  - `stepIndex` an auto-assigned index
  - `data` wizard state data for this step
  - `stepsData` all of the steps data (handy for summary form or, autofill e.g. billing->shipping). _Only passed through if stepsDataRequired is set_
  - `stepsInformation` e.g. to create a summary step
  - `handleSatisfied` Event to raise when step is satisfied (to allow progression to next step)
  - `handleDataChanged` Send and event when data changes (to allow wizard to update the state for this step)

## Basic Pseudo Example

```html
<Wizard
    onFinish={event-handler}
    title='Wizard Example'
    finishedMessage='Finished'
    defaultRequiredMessage='Please enter data'
    >
    <WizardStep
        id='step1'
        title='Step 1'
        description='Enter some data'
        required={false}
    >
        {your-form-as-render-prop}
    </WizardStep>
    <WizardStep
        id='step2'
        title='Step 2'
        description='Enter some more data'
        required={true}
        requiredMessage='You must enter some data'
    >
        {your-form-as-render-prop}
    </WizardStep>
</Wizard>
```
