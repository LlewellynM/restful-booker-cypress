describe('Booking Flow', () => {
beforeEach(() => {
cy.clearLocalStorage()
  cy.visit('/')
    
});

// TC-001 — Happy path
it('TC-001: completes a booking with valid data', () => {

   // 1. Enter Check-in and Check-out dates in the availability form
    // The inputs are inside react-datepicker containers
    cy.get('label[for="checkin"]').parent().find('input').clear().type('2028-06-13{enter}');
    cy.get('label[for="checkout"]').parent().find('input').clear().type('2028-06-15{enter}');

    // 2. Click "Check Availability"
    cy.contains('button', 'Check Availability').click();

    // 3. Select the first available room's "Book now" button
    // This targets the first room card's primary button
  cy.get('#rooms > .container').first().find('a.btn-primary, button').contains('Book now').click();
    cy.wait(1000) // Wait for booking form to load
     cy.contains('button', 'Reserve Now').click();
    cy.scrollTo('top') // Ensure form is in view


    // 4. Enter User Details (assuming navigation to reservation page or modal)
    // The fields use data-testid and standard IDs
    cy.get('[name="firstname"]').type('Joe');
    cy.get('[name="lastname"]').type('Smith');
    cy.get('.room-email').type(`joe.smith${Date.now()}@example.com`);
    cy.get('.room-phone').type('01234567890');
    cy.contains('button', 'Reserve Now').click();
     cy.wait(5000) // Wait for confirmation to process
   

    // 5. Confirm the Booking
    cy.contains('Booking Confirmed', {timeout: 10000}).should('be.visible');


    // 6. Verify success (adjust based on actual success message)
    cy.contains('Your booking has been confirmed ').should('be.visible');
     cy.scrollTo('top') // Ensure form is in view
  });
  
});

    