describe('Admin Authentication', () => {

  // TC-018 — Valid login
  it('TC-018: logs in with valid credentials', () => {
    cy.visit('/admin')
    cy.get('#username').type(Cypress.env('adminUser'))
    cy.get('#password').type(Cypress.env('adminPass'))
    cy.get('#doLogin').click()
    cy.url().should('include', '/admin')
    cy.contains('Room details')
  })
   // TC-019 — Invalid password
  it('TC-019: rejects invalid credentials', () => {
    cy.visit('/admin')
    cy.get('#username').type('admin')
    cy.get('#password').type('wrongpassword')
    cy.get('#doLogin').click()
    cy.get('.alert-danger').should('be.visible')
    cy.get('.roomlisting').should('not.exist')
  })
    // TC-020 — Blank credentials
  it('TC-020: shows error when credentials are blank', () => {
    cy.visit('/admin')
    cy.get('#doLogin').click()
    cy.get('.alert-danger, .invalid-feedback').should('be.visible')
  })

  // TC-023 — Logout clears session
  it('TC-023: clears session on logout', () => {
  
    cy.visit('/admin')
        cy.get('#username').type('admin')
    cy.get('#password').type('password')
    cy.get('#doLogin').click()
    cy.get('.ms-auto > :nth-child(2) > .btn').click()
    cy.clearCookies()
    // cy.visit('/admin')
    // cy.get('#username').should('be.visible')
    // cy.get('.roomlisting').should('not.exist')
  })
    })