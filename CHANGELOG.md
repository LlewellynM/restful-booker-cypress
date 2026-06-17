cat << 'EOF' > CHANGELOG.md
# Changelog

All notable changes to this project will be documented in this file.

## - 2026-06-17

### Added
- **Custom Commands**: Injected reusable helpers into `cypress/support/commands.js` to simplify test flows.
- **Centralized Test Data**: Integrated structured `testData` fixtures to replace hardcoded values.

### Changed
- **Cypress Configuration**: Updated `cypress.config.js` to optimize test execution and reporting settings.
- **Reporting Optimization**: Streamlined the test execution flow to generate automated HTML reports.

### Removed
- **Example Files**: Deleted default boilerplate Cypress spec files to clean up the repository.

### Fixed
- **Flaky Tests**: Resolved timing and brittle assertion issues in `booking.js` to stabilize CI/CD test runs.
EOF
