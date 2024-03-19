/** @type {import('jest').Config} */

const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/importHelpers.js'],
};

module.exports = config;
