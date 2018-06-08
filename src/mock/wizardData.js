export const wizardData = {
  id: 'gandalf',
  title: 'Gandalf Tasks Wizard',
  description: 'Gandalf Tasks Wizard  v0.0.1',
  defaultRequiredMessage: 'You Shall Not Pass (without entering a comment)!',
  steps: [
    {
      id: 'step1',
      title: 'Frodo',
      description: 'Get Frodo to Agree',
      optional: true
    },
    {
      id: 'step2',
      title: 'Assemble Fellowship',
      description: 'Meet up with Aragorn, Legolas and Gimli',
      requiredMessage: 'A comment is required (AND MY AXE!)'
    },
    {
      id: 'step3',
      title: 'Minas Tirith',
      description: 'Get Through Minis Tirith'
    },
    {
      id: 'step4',
      title: 'Mordor',
      description: 'Walk into Mordor',
      optional: false,
      requiredMessage:
        'One does not simply walk into Mordor (without entering a comment)!'
    },
    {
      id: 'step5',
      title: 'Destroy the Ring',
      description: 'Wait for Frodo'
    }
  ],
  finishedMessage: 'Congrats Gandalf!!! time to blow some smoke rings ô¿ô'
};
