The wizard component is a generic wizard using material UI's stepper component

Wizard reads a json data file taking the following format:

wizardData = {
id: 'the-id-of-wizard',
title: 'title displayed on all steps' ,
description: 'a general description',
defaultRequiredMessage: 'Default messsage if a step hasn't been satisfied',
steps: [
{
id: 'id-of-step',
title: 'Title displayed on stepper',
description: 'Shown at top of step before component loaded',
optional: if true the step need not have any data
},
],
finishedMessage: 'Message displayed at end'
};

Each step should conform to the the convention:

- Send an event when step satisfied onStepSatisfied (to allow progression to next step)
- Send and event when data changes onDataChanges (to raise state up)
- Accept step information from wizard (passed via props to initialize e.g. setup or reset form values)
- Accept step data from wizard (passed via props to initialize e.g. if step info is needed)

The final step in this example invokes another step component called wizard-summary-step accepts all step data to display a summary. It raises out the onStepSatisfiedEvent too to progress to finish.

See the wizard-step component for an example of a step form receiving and passing data to the wiz`rd
See wizard-summary-step for step showing summary results
The wizardData file will instantiate 5 wizard-steps and one wizard-summary-step
