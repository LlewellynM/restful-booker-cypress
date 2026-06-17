const { defineConfig } = require('cypress')
const mochawesome = require('cypress-mochawesome-reporter/plugin')

module.exports = defineConfig({
  projectId: 'asy715',
  e2e: {
    baseUrl: 'https://automationintesting.online',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,
    video: true,
    screenshotOnRunFailure: true,
    env: {
      adminUser: 'admin',
      adminPass: 'password'
    },
    setupNodeEvents(on, config) {
      mochawesome(on)
      return config
    }
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Restful Booker Cypress Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  }
})
// const { defineConfig } = require('cypress')

// module.exports = defineConfig({
//   projectId: 'asy715',
//   e2e: {
//     baseUrl: 'https://automationintesting.online',
//     viewportWidth: 1280,
//     viewportHeight: 800,
//     defaultCommandTimeout: 8000,
//     video: true,
//     screenshotOnRunFailure: true,
//     specPattern: 'cypress/e2e/**/*.cy.js',
//     supportFile: 'cypress/support/e2e.js',
//     reporter: 'cypress-mochawesome-reporter',
//     reporterOptions: {
//       reportDir: 'cypress/reports',
//       overwrite: false,
//       html: true,
//       json: true,
//     },
//     env: {
//       adminUser: 'admin',
//       adminPass: 'password',
//     },
//   },
// })