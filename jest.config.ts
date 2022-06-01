export default {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  globalSetup: "./test/utils/setup.ts",
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.[jt]s?(x)"],
  globalTeardown: "./test/utils/teardown.ts",
};
