import { jsWithTs as tsjPreset } from 'ts-jest/presets'

export default {
  testEnvironment: 'node',
  collectCoverageFrom: ['lib/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**'],
  transform: {
    ...tsjPreset.transform
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
}
