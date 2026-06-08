describe('Room Management', () => {

  beforeEach(() => {
      
    cy.visit('/admin')
    cy.get('#username').type(Cypress.env('adminUser'))
    cy.get('#password').type(Cypress.env('adminPass'))
    cy.get('#doLogin').click()
    cy.url().should('include', '/admin')
    cy.contains('Room details')
  })
 
  // TC-024 — Create room
  it('TC-024: creates & deletes a room with all valid fields', () => {
    cy.get('#roomName').type('301')
    cy.get('#type').select('Single')
    cy.get('#accessible').select('true')
    cy.get('#roomPrice').clear().type('120')
    cy.get('#createRoom').click()
    cy.contains('301').should('be.visible')
    cy.wait(1000)

    // Cleanup - delete the room
    cy.contains('.row.detail', '301')
      .find('.roomDelete')
      .click();
    cy.contains('301').should('not.exist');
  })
  // TC-027 — Zero price
it('TC-027: rejects a zero room price', () => {
cy.get('#roomName').type('ZERO1')
cy.get('#type').select('Single')
cy.get('#accessible').select('false')
cy.get('#roomPrice').clear().type('0')
cy.get('#createRoom').click()
cy.get('.alert-danger').should('be.visible')
})
// TC-026 — Negative price
it('TC-026: rejects a negative room price', () => {
cy.get('#roomName').type('NEG1')
cy.get('#type').select('Double')
cy.get('#accessible').select('false')
cy.get('#roomPrice').clear().type('-50')
cy.get('#createRoom').click()
cy.get('.alert-danger').should('be.visible')
})
   })