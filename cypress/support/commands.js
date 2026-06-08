// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ── cy.adminLogin() ──────────────────────────────────────────────────────────
// Logs in via the admin UI and caches the session so it only runs once per run
Cypress.Commands.add('adminLogin', () => {
  cy.session('adminSession', () => {
    cy.visit('/#/admin')
    cy.get('#username').type(Cypress.env('adminUser'))
    cy.get('#password').type(Cypress.env('adminPass'))
    cy.get('#doLogin').click()
    cy.get('.roomlisting').should('be.visible')
  })
})

// ── cy.fillBookingForm(data) ─────────────────────────────────────────────────
// Fills the guest-facing booking form fields
Cypress.Commands.add('fillBookingForm', ({ firstName, lastName, email, phone, checkin, checkout }) => {
  cy.get('[data-testid="firstname"]').clear().type(firstName)
  cy.get('[data-testid="lastname"]').clear().type(lastName)
  cy.get('[data-testid="email"]').clear().type(email)
  cy.get('[data-testid="phone"]').clear().type(phone)
  cy.get('[data-testid="checkin"]').clear().type(checkin)
  cy.get('[data-testid="checkout"]').clear().type(checkout)
})