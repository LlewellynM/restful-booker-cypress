// ***********************************************
// Cypress custom commands
// ***********************************************

Cypress.Commands.add('adminLogin', () => {
  cy.session('adminSession', () => {
    cy.visit('/#/admin')
    cy.get('#username').type(Cypress.env('adminUser'))
    cy.get('#password').type(Cypress.env('adminPass'))
    cy.get('#doLogin').click()
    cy.get('.roomlisting').should('be.visible')
  })
})

Cypress.Commands.add('fillBookingForm', ({ firstName, lastName, email, phone, checkin, checkout }) => {
  cy.get('[data-testid="firstname"]').clear().type(firstName)
  cy.get('[data-testid="lastname"]').clear().type(lastName)
  cy.get('[data-testid="email"]').clear().type(email)
  cy.get('[data-testid="phone"]').clear().type(phone)
  cy.get('[data-testid="checkin"]').clear().type(checkin)
  cy.get('[data-testid="checkout"]').clear().type(checkout)
})