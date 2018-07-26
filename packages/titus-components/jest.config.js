'use strict'

module.exports = {
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
  coveragePathIgnorePatterns: ['node_modules'],
  coverageReporters: ['text', 'html'],
  testMatch: ['**/*.test.js', '**/*.test.jsx'],
  setupTestFrameworkScriptFile: './test/config.js'
}
