markdown
# Restful Booker — Cypress UI Test Suite
UI automation for automationintesting.online as part of the WBS QA Engineer Tech Cha
## Tech Stack
- Cypress 13 + JavaScript
- cypress-mochawesome-reporter (HTML reports)
- GitHub Actions (CI)
## Prerequisites
- Node.js 18+
- npm
## Setup
\`\`\`bash
git clone https://github.com/YOUR-USERNAME/restful-booker-cypress.git
cd restful-booker-cypress
npm ci
\`\`\`
## Run Tests
\`\`\`bash
# Headless (terminal output)
npm run cy:run
# Interactive (Cypress UI)
npm run cy:open
# Single spec
npx cypress run --spec "cypress/e2e/booking.cy.js"
\`\`\`
## View Report
Open `cypress/reports/index.html` in your browser after a headless run.
## Test Coverage
|
Module
|
Automated
|
Manual
|
|
--------
|
-----------
|
--------
|
|
Booking Flow
|
6
|
4
|
|
Contact Form
|
6
|
1
|
|
Admin Auth
|
4
|
2
|
|
Room Management
|
5
|
3
|
|
Booking Management
|
2
|
1
|
|
Branding
|
2
n
# Restful Booker — Cypress UI Test Suite
UI automation for automationintesting.online as part of the WBS QA Engineer Tech Cha
## Tech Stack
- Cypress 13 + JavaScript
- cypress-mochawesome-reporter (HTML reports)
- GitHub Actions (CI)
## Prerequisites
- Node.js 18+
- npm
## Setup
\`\`\`bash
git clone https://github.com/YOUR-USERNAME/restful-booker-cypress.git
cd restful-booker-cypress
npm ci
\`\`\`
## Run Tests
\`\`\`bash
# Headless (terminal output)
npm run cy:run
# Interactive (Cypress UI)
npm run cy:open
# Single spec
npx cypress run --spec "cypress/e2e/booking.cy.js"
\`\`\`
## View Report
Open `cypress/reports/index.html` in your browser after a headless run.
## Test Coverage
|
Module
|
Automated
|
Manual
|
|
--------
|
-----------
|
--------
|
|
Booking Flow
|
6
|
4
|
|
Contact Form
|
6
|
1
|
|
Admin Auth
|
4
|
2
|
|
Room Management
|
5
|
3
|
|
Booking Management
|
2
|
1
|
|
Branding
|
2

## Assumptions
- Admin credentials are admin / password (default for this platform)
- The platform resets periodically — tests create their own data
- Dates in tests are set to 2026-09 onwards to avoid past-date issues
## Known Limitations
- Some selectors (data-testid values) may need updating if the app changes
- Branding tests may fail if another tester has changed hotel name during the run
- TC-033 (delete booking) assumes room ID 1 exists — may need adjustment after a res
markdown
# Architectural Decisions
## Why Cypress JS over Playwright?
Cypress has a shallower learning curve and an excellent interactive test runner
that makes debugging fast. cy.session() and cy.intercept() cover the two
biggest friction points (repeated login and API stubbing) without extra libraries.
For a 4-hour challenge, this reduces setup time significantly.
## Why JavaScript over TypeScript?
Lower overhead for a short challenge. TypeScript adds value on large teams or
setup within this time constraint.
## Selector strategy
Prefer data-testid attributes. Fall back to IDs, then semantic CSS classes.
## Test data
All test data is created and destroyed within the test or spec lifecycle using
## What I'd add with more time
- Page Object Model (POM) to reduce selector duplication across spec files
- API test layer (Option A) to complement the UI suite
- Visual regression testing with percy.io