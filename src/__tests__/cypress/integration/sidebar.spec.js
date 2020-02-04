describe('Sidebar', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show the expected elements when logged in', () => {
    const pw = 'clay harbor enemy utility margin pretty hub comic piece aerobic umbrella acquire';

    cy.wait(1000);

    cy.visit('/login');

    cy.get('input[name=passphrase')
      .type(pw)
      .should('have.value', pw);

    cy.get('button').click();

    cy.wait(1000);

    cy.get('#sidebar-wrapper')
      .get('a[href*="/"]')
      .should('exist');

    cy.get('#sidebar-wrapper')
      .get('a[href*="/channels"]')
      .should('exist');

    cy.get('#sidebar-wrapper')
      .get('button')
      .contains('Log Out');
  });

  it('should show and hide the navbar by clicking on the collapse button', () => {
    cy.wait(1000);

    cy.isNotInViewport('#sidebar-wrapper');

    cy.get('#collapse-button')
      .click()
      .wait(1000);

    cy.isInViewport('#sidebar-wrapper');

    cy.get('#collapse-button')
      .click()
      .wait(1000);

    cy.isNotInViewport('#sidebar-wrapper');
  });

  it('should show and hide the navbar by logging in and out', () => {
    const pw = 'clay harbor enemy utility margin pretty hub comic piece aerobic umbrella acquire';

    cy.wait(1000);

    cy.isNotInViewport('#sidebar-wrapper');

    cy.visit('/login');

    cy.get('input[name=passphrase')
      .type(pw)
      .should('have.value', pw);

    cy.get('button').click();

    cy.wait(1000);

    cy.isInViewport('#sidebar-wrapper');

    cy.get('button')
      .contains('Log Out')
      .click();

    cy.wait(1000);

    cy.isNotInViewport('#sidebar-wrapper');
  });
});
