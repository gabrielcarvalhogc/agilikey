module.exports = {
  preset: 'jest-preset-angular',

  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],

  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],

  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
  },
};
