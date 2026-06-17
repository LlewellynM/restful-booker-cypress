describe('Booking Flow', () => {
  // --- Date helpers --------------------------------------------------------
  // Root cause of the 409: checkIn/checkOut were fixed offsets (+5 / +7 days from "today").
  // Every run booked the *same calendar date*. The first run succeeds; any later run
  // (a local rerun, a second CI build, a retry) tries to book a date that's already taken
  // by the previous run's booking, and the API returns 409 Conflict.
  // Fix: pick the check-in date randomly from a wide future window so each run lands on a
  // different date — collision odds drop to roughly 1 in (maxDaysOut - minDaysOut).
  const randomCheckInDate = (minDaysOut = 14, maxDaysOut = 365) => {
    const offset = Math.floor(Math.random() * (maxDaysOut - minDaysOut + 1)) + minDaysOut
    const date = new Date()
    date.setDate(date.getDate() + offset)
    return date
  }
 
  const addDays = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }
 
  const toISODate = (date) => date.toISOString().slice(0, 10)
 
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')
    // Wait for page to fully load
    cy.get('body', { timeout: 10000 }).should('exist')
  })
 
  it('TC-001: completes a booking with valid data', () => {
    const checkInDate = randomCheckInDate()
    const checkOutDate = addDays(checkInDate, 2) // 2-night stay, same length as the original fixed range
    const checkIn = toISODate(checkInDate)
    const checkOut = toISODate(checkOutDate)
 
    // Guest identity generated fresh per run too — a stable name/email pair has the same
    // collision risk as a stable date if the app ever de-dupes bookings by guest identity.
    const uniqueGuest = `Joe${Date.now().toString().slice(-6)}`
    const uniqueEmail = `joe.${uniqueGuest.toLowerCase()}@example.com`
 
    // 1. Select fresh future dates
    cy.get('label[for="checkin"]').parent().find('input')
      .clear()
      .type(`${checkIn}{enter}`)
 
    cy.get('label[for="checkout"]').parent().find('input')
      .clear()
      .type(`${checkOut}{enter}`)
 
    // 2. Check room availability
    cy.contains('button', 'Check Availability').should('be.enabled').click()
 
    // 3. Pick the first available room
    cy.get('#rooms > .container', { timeout: 20000 })
      .should('have.length.at.least', 1)
      .first()
      .find('a.btn-primary, button')
      .contains('Book now')
      .click({ force: true })
 
    cy.url().should('include', '/reservation/')
 
    // 4. Reveal the reservation form
    cy.contains('button', 'Reserve Now', { timeout: 30000 })
      .scrollIntoView()
      .click()
 
    cy.get('[name="firstname"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(uniqueGuest)
    cy.get('[name="lastname"]').clear().type('Smith')
    cy.get('[name="email"]').clear().type(uniqueEmail)
    cy.get('[name="phone"]').clear().type('01234567890')
 
    // 5. Submit, with a 409 retry kept as a defensive safety net — not the primary fix.
    // Registered once, before the first attempt, so the alias isn't re-declared on every retry.
    cy.intercept('POST', '/api/booking').as('book')
 
    const maxRetries = 3
    const attemptBooking = (retriesLeft) => {
      cy.contains('button', 'Reserve Now', { timeout: 15000 })
        .scrollIntoView()
        .should('be.visible')
        .click()
 
      cy.wait('@book').then((interception) => {
        const status = interception?.response?.statusCode ?? interception?.response?.status
 
        if (status === 201 || status === 200) {
          cy.contains('Booking Confirmed', { timeout: 40000 }).should('be.visible')
          cy.contains('Your booking has been confirmed', { timeout: 30000 }).should('be.visible')
        } else if (status === 409 && retriesLeft > 0) {
          const retryEmail = `joe.${uniqueGuest.toLowerCase()}+${Date.now()}@example.com`
          cy.log(`Booking 409 received — retrying with ${retryEmail}`)
          // Assert the new value landed instead of a hard cy.wait(500) — removes one more
          // arbitrary sleep, and one more source of flakiness, from the retry path.
          cy.get('[name="email"]').clear().type(retryEmail).should('have.value', retryEmail)
          attemptBooking(retriesLeft - 1)
        } else {
          throw new Error(`Booking failed with status ${status}. See server response for details.`)
        }
      })
    }
 
    attemptBooking(maxRetries)
  })
})
// Old script for reference, kept for context but commented out
// describe('Booking Flow', () => {
// beforeEach(() => {
// cy.clearLocalStorage()
//   cy.visit('/')
    
// });

// // TC-001 — Happy path
// it('TC-001: completes a booking with valid data', () => {

//    // 1. Enter Check-in and Check-out dates in the availability form
//     // The inputs are inside react-datepicker containers
// const formatDate = (date) => date.toISOString().slice(0, 10)

// const getFutureDates = () => {
//   const checkIn = new Date()
//   const checkOut = new Date()

//   checkIn.setDate(checkIn.getDate() + 5)
//   checkOut.setDate(checkOut.getDate() + 7)

//   return {
//     checkIn: formatDate(checkIn),
//     checkOut: formatDate(checkOut)
//   }
// }

// const { checkIn, checkOut } = getFutureDates()

// cy.get('label[for="checkin"]').parent().find('input')
//   .clear()
//   .type(`${checkIn}{enter}`)

// cy.get('label[for="checkout"]').parent().find('input')

//     // 2. Click "Check Availability"
//     cy.contains('button', 'Check Availability').click();

//     // 3. Select the first available room's "Book now" button
//     // This targets the first room card's primary button
//   cy.get('#rooms > .container').first().find('a.btn-primary, button').contains('Book now').click();
//     cy.wait(1000) // Wait for booking form to load
//      cy.contains('button', 'Reserve Now').click();
//     cy.scrollTo('top') // Ensure form is in view


//     // 4. Enter User Details (assuming navigation to reservation page or modal)
//     // The fields use data-testid and standard IDs
//     cy.get('[name="firstname"]').type('Joe');
//     cy.get('[name="lastname"]').type('Smith');
//     cy.get('.room-email').type(`joe.smith${Date.now()}@example.com`);
//     cy.get('.room-phone').type('01234567890');
//     cy.contains('button', 'Reserve Now').click();
//      cy.wait(5000) // Wait for confirmation to process
   

//     // 5. Confirm the Booking
//     cy.contains('Booking Confirmed', {timeout: 10000}).should('be.visible');


//     // 6. Verify success (adjust based on actual success message)
//     cy.contains('Your booking has been confirmed ').should('be.visible');
//      cy.scrollTo('top') // Ensure form is in view
//   });
  
// });

    