export const wizardData = {
  id: 'gandalf',
  title: 'Gandalf Notes Wizard',
  steps: [
    {
      id: 'step1',
      name: 'Frodo',
      description: 'Get Frodo to Agree'
    },
    {
      id: 'step2',
      name: 'Asseble Fellowship',
      description: 'Meet up with Aragorn, Legolas and Gimli'
    },
    {
      id: 'step3',
      name: 'Minas Tirith',
      description: 'Get Through Minis Tirith'
    },
    {
      id: 'step4',
      name: 'Mordor',
      description: 'One does not Simply Walk into Mordor',
      optional: true
    },
    {
      id: 'step5',
      name: 'Destroy the Ring',
      description: 'Wait for Frodo'
    }
  ],
  finishedMessage: 'Congrats Gandalf!'
};
