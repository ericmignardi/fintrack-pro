export default {
  testEnvironment: "node",
  transform: {},
  testMatch: [
    "**/__tests__/unit/**/*.test.js",
    "**/__tests__/integration/**/*.test.js",
  ],
  setupFiles: ["<rootDir>/jest.setup.js"],
};
