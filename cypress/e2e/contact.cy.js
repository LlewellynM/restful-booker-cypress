describe('Contact Form', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('#contact').scrollIntoView()
  })

  // TC-011 — Happy path
  it('TC-011: submits successfully with all valid fields', () => {
    cy.get('[data-testid="ContactName"]').type('John Doe')
    cy.get('[data-testid="ContactEmail"]').type('john@example.com')
    cy.get('[data-testid="ContactPhone"]').type('01234567890')
    cy.get('[data-testid="ContactSubject"]').type('Valid Subject Here')
    cy.get('[data-testid="ContactDescription"]').type('This is a valid message with enough characters to pass.')
    cy.get('.d-grid > .btn').click()
    cy.contains('Thanks for getting in touch', { timeout: 8000 }).should('be.visible')
  })

  // TC-012 — All blank
  it('TC-012: shows errors when all fields are empty', () => {
    cy.get('.d-grid > .btn').click()
    cy.get('.alert-danger').should('be.visible')
  })

  // TC-013 — Short subject
  it('TC-013: rejects subject under 5 characters', () => {
    cy.get('[data-testid="ContactName"]').type('John Doe')
    cy.get('[data-testid="ContactEmail"]').type('john@example.com')
    cy.get('[data-testid="ContactPhone"]').type('01234567890')
    cy.get('[data-testid="ContactSubject"]').type('Hi')
    cy.get('[data-testid="ContactDescription"]').type('This is a valid message with enough characters.')
    cy.get('.d-grid > .btn').click()
    cy.get('.alert-danger').should('contain.text', 'Subject must be between 5 and 100 characters')
  })

  // TC-014 — Short message
  it('TC-014: rejects message under 20 characters', () => {
    cy.get('[data-testid="ContactName"]').type('John Doe')
    cy.get('[data-testid="ContactEmail"]').type('john@example.com')
    cy.get('[data-testid="ContactPhone"]').type('01234567890')
    cy.get('[data-testid="ContactSubject"]').type('Valid Subject')
    cy.get('[data-testid="ContactDescription"]').type('Too short')
    cy.get('.d-grid > .btn').click()
    cy.get('.alert-danger').should('be.visible')
  })

  // TC-015 — Subject over 100 chars
  it('TC-015: rejects subject over 100 characters', () => {
    cy.fixture('testData').then((data) => {
      cy.get('[data-testid="ContactName"]').type('John Doe')
      cy.get('[data-testid="ContactEmail"]').type('john@example.com')
      cy.get('[data-testid="ContactPhone"]').type('01234567890')
      cy.get('[data-testid="ContactSubject"]').type(data.longString)
      cy.get('[data-testid="ContactDescription"]').type('This is a valid message with enough characters.')
      cy.get('.d-grid > .btn').click()
      cy.get('.alert-danger').should('be.visible')
    })
  })

  
  })
