beforeEach(() => {
  cy.visit('/admin')
    cy.get('#username').type(Cypress.env('adminUser'))
    cy.get('#password').type(Cypress.env('adminPass'))
    cy.get('#doLogin').click()
    cy.url().should('include', '/admin')
cy.get('#brandingLink').click()
})
// TC-035 — Update hotel name
it('TC-035: updates hotel name and reflects it on the page', () => {
cy.get('#name').clear().type('Test Hotel Updated')
cy.get('#updateBranding').click()
})
// TC-036 — Update contact details
it('TC-036: updates contact phone and email', () => {
cy.get('#contactPhone').clear().type('09876543210')
cy.get('#contactEmail').clear().type('updated@hotel.com')
cy.get('#updateBranding').click()
})