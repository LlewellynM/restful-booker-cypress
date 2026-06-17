
import './commands'
import 'cypress-mochawesome-reporter/register'
require('./commands')
require('cypress-mochawesome-reporter/register')

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
