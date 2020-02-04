describe('Channels', () => {
  beforeEach(() => {
    const userPassphrase =
      'clay harbor enemy utility margin pretty hub comic piece aerobic umbrella acquire';

    cy.visit('/login');

    cy.get('input[name=passphrase').type(userPassphrase);

    cy.get('button').click();

    cy.wait(3000);
  });

  describe('Create Channel', () => {
    it('should create and join a new channel', () => {
      cy.get('#create-button').click();

      cy.wait(500);

      cy.get('#create').contains('Channel ID');

      cy.get('#create').contains('Passphrase');

      cy.wait(3000);

      cy.get('#join-button-2').click();

      cy.url().should('not.eq', Cypress.config('baseUrl') + '/channels');

      cy.get('#page-content-wrapper').contains('No messages');
    });
  });

  describe('Join Channel', () => {
    it('should accept input', () => {
      const pw = 'somepassphrase';

      cy.get('input[name=passphrase')
        .type(pw)
        .should('have.value', pw);
    });

    it('should join the channel', () => {
      const pw = 'road mesh portion rich damp grain defense away pill curious dynamic moment';

      cy.get('input[name=passphrase')
        .type(pw)
        .should('have.value', pw);

      cy.get('#join-button').click();

      cy.url().should('eq', Cypress.config('baseUrl') + '/chat/AJAkJNx1Xpb9cPVWb3hdkXqwvyeBYcoUW7');
    });
  });
});
