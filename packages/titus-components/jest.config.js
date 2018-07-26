'use strict'

module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['node_modules'],
  coverageReporters: ['text', 'html'],
  testMatch: ['**/*.test.js'],
  setupTestFrameworkScriptFile: './test/config.js',
  transform: {
    '^.+\\.js$': '<rootDir>/test/jest.transform.js'
  }
}
