'use strict'

module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['node_modules', 'src/uploader/stories'],
  coverageReporters: ['text', 'html'],
  testMatch: ['**/*.test.js'],
  clearMocks: true,
  resetModules: true,
  setupTestFrameworkScriptFile: './test/config.js',
  transform: {
    '^.+\\.js$': '<rootDir>/test/jest.transform.js'
  },
  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js'
  }
}
