Cypress.Commands.add('isNotInViewport', element => {
  cy.get(element).then($el => {
    const rect = $el[0].getBoundingClientRect();

    expect(rect.left).to.be.lessThan(0);
  });
});

Cypress.Commands.add('isInViewport', element => {
  cy.get(element).then($el => {
    const rect = $el[0].getBoundingClientRect();

    expect(rect.left).to.equal(0);
  });
});
