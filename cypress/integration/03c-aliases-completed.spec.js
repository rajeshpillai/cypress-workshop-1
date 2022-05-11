/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');

    cy.get('[data-test="filter-items"]').as('filterInput');
  });

  it('should hold onto an alias', () => {
    cy.get('@unpackedItems').find('label').first().as('firstItem');
    cy.get('@firstItem').invoke('text').as('text');
    cy.get('@firstItem').find('input[type="checkbox"]').click();

    cy.get('@text').then((text) => {
      cy.get('@packedItems').find('label').first().should('include.text', text);
    });
  });

  it('should filter the items shown on the page', () => {
    cy.get('@filterInput').type('iPhone');

    cy.get('@allItems').should('contain.text', 'iPhone');
    cy.get('@allItems').should('not.contain.text', 'Hoodie');
  });

  it('should move items from one list to the other', () => {
    // cy.get('@unpackedItems').find('li').first().as('itemInQuestion');
    // cy.get('@itemInQuestion').find('label').as('itemLabel');
    // cy.get('@itemLabel').invoke('text').as('itemName');

    cy.get('@unpackedItems').find('label').first().as('itemLabel');
    cy.get('@itemLabel').invoke('text').as('itemName');
    
    cy.get('@itemLabel').click();
    cy.get('@itemName').then(text => {
      cy.get('@packedItems').contains(text);
    })
  })
});
