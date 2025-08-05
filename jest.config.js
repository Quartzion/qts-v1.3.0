const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^react$': path.resolve('./node_modules/react'),
    '^react-dom$': path.resolve('./node_modules/react-dom'),
  },
};
