describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should contain the expected elements', () => {
    cy.contains('ARK Messenger');

    cy.contains('Total Users');

    cy.contains('Total Messages');

    cy.get('a[href="/login"]').should('exist');

    cy.get('a[href*="/create-account"]').should('exist');
  });

  it("should navigate to the 'Login' page", () => {
    cy.get('a[href*="/login"]').click();

    cy.get('h1').contains('Log in');

    cy.url().should('eq', Cypress.config('baseUrl') + '/login');
  });

  it("should navigate to the 'Create Account' page", () => {
    cy.get('a[href*="/create-account"]').click();

    cy.get('h1').contains('Create Account');

    cy.url().should('eq', Cypress.config('baseUrl') + '/create-account');
  });
});
