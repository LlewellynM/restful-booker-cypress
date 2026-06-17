describe('Admin Authentication', () => {



// TC-032 — View bookings details screen
it('TC-032: admin can view the bookings list, select a booking and make an update', () => {
  cy.visit('/admin')
    cy.get('#username').type(Cypress.env('adminUser'))
    cy.get('#password').type(Cypress.env('adminPass'))
    cy.get('#doLogin').click()
    cy.url().should('include', '/admin')
    cy.get('.row.detail').first().click()
    cy.contains('button', 'Edit').should('be.visible').click()
    cy.get('#roomPrice').should('be.visible').clear().type('200')
    cy.get('#update').click()
    cy.contains('Room price:').should('contain', '200')

  })
})