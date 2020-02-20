describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it("should navigate back to the 'Home' page", () => {
    cy.get('a[href="/"]').click();

    cy.get('h1').contains('ARK Messenger');

    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });

  it('should accept input', () => {
    const pw = 'somepassphrase';

    cy.get('input[name=passphrase')
      .type(pw)
      .should('have.value', pw);
  });

  it('should login the user as tester', () => {
    const pw = 'stove guilt master police weapon travel inhale convince fire sign ritual observe';

    cy.get('#sidebar-wrapper').contains('Not logged in');

    cy.get('input[name=passphrase')
      .type(pw)
      .should('have.value', pw);

    cy.get('button').click();

    cy.get('#sidebar-wrapper')
      .should('not.contain.text', 'Not logged in')
      .contains('tester');

    cy.url().should('eq', Cypress.config('baseUrl') + '/channels');
  });
});
