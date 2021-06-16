module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    // '\\.(css|less|scess|sass)$': 'identity-obj-proxy',
  },
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/components$1",
    "^@/config(.*)$": "<rootDir>/config$1",
    "^@/3d(.*)$": "<rootDir>/objects3d$1",
    "^@/hooks(.*)$": "<rootDir>/hooks$1",
    "^@/store(.*)$": "<rootDir>/store$1",
    "^@/helpers(.*)$": "<rootDir>/helpers$1",
  },
};
