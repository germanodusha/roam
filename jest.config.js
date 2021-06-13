module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    // '\\.(css|less|scess|sass)$': 'identity-obj-proxy',
  },
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/components$1",
  },
};
