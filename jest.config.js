module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js'],
    testMatch: ['**/tests/**/*.test.js'],
    transform: {
      '^.+\\.js$': 'babel-jest'
    }
  };