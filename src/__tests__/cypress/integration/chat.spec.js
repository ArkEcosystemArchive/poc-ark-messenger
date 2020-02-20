import { createRandomString as r } from '../helpers';

describe('Chat', () => {
  beforeEach(() => {
    const userPassphrase =
      'stove guilt master police weapon travel inhale convince fire sign ritual observe';
    const channelPassphrase =
      'limb tobacco green tower time source piano icon run barely pigeon curve';

    cy.visit('/login');

    cy.get('input[name=passphrase]').type(userPassphrase);

    cy.get('button').click();

    cy.get('input[name=passphrase]').type(channelPassphrase);

    cy.get('#join-button').click();
  });

  describe('Chat', () => {
    it('should accept input', () => {
      const text = 'some text';

      cy.get('textarea[name=message]')
        .type(text)
        .should('have.value', text);
    });

    it("should send a message to the channel by pressing the 'Enter' key", () => {
      const randomText = 'Random text: ' + r();

      cy.get('textarea[name=message]')
        .type(randomText)
        .should('have.value', randomText)
        .type('{enter}');

      cy.wait(5000);

      cy.get('#page-content-wrapper').contains(randomText);
    });

    it("should send a message to the channel by clicking the 'Send' button", () => {
      const randomText = 'Random text: ' + r();

      cy.get('textarea[name=message]')
        .type(randomText)
        .should('have.value', randomText);

      cy.get('#send-button').click();

      cy.wait(5000);

      cy.get('#page-content-wrapper').contains(randomText);
    });
  });
});
