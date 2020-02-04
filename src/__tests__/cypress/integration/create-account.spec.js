import { createRandomString as r } from '../helpers';

describe('Create Account', () => {
  beforeEach(() => {
    cy.visit('/create-account');
  });

  it("should navigate back to the 'Home' page", () => {
    cy.get('a[href*="/"]').click();

    cy.get('h1').contains('ARK Messenger');

    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });

  it('should accept input', () => {
    const text = 'somename';

    cy.get('input[name=username')
      .type(text)
      .should('have.value', text);
  });

  it('should create a new user', () => {
    const username = 'test' + r() + r();

    cy.get('input[name=username')
      .type(username)
      .should('have.value', username);

    cy.get('button').click();

    cy.wait(8000);

    cy.get('#username').contains(username);
    cy.get('#passphrase').should('exist');

    cy.get('button')
      .contains('Log In')
      .click();

    cy.url().should('eq', Cypress.config('baseUrl') + '/login');
  });
});
