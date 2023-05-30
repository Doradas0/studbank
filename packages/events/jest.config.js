module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/transformers/__tests__"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
