const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'asy715',
  e2e: {
    baseUrl: 'https://automationintesting.online',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,
    video: true,
    screenshotOnRunFailure: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
    },
    env: {
      adminUser: 'admin',
      adminPass: 'password',
    },
  },
})