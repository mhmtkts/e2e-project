import { errorMessages } from "../../src/components/Login";

beforeEach(()=>{
  cy.visit("/");
})

describe('Login Page', () => {
  describe("Error Messages", () => {
    it('Email input throws error for mahmut@gmail.', () => {
      cy.get('[data-cy="email-input"]').type("mahmut@gmail.")
      cy.contains(errorMessages.email)
    });
    it('Password input throws error for 123', () => {
      cy.get('[data-cy="password-input"]').type("123")
      cy.contains(errorMessages.password)
    });
    it('Button is disabled for unvalidated inputs.', () => {
      cy.get('[data-cy="email-input"]').type("mahmut@gmail.")
      cy.get('[data-cy="submit-button"]').should("be.disabled")
    });
    it('Button is disabled for unvalidated inputs.', () => {
      cy.get('[data-cy="password-input"]').type("123")
      cy.get('[data-cy="submit-button"]').should("be.disabled")
    });
    it('Button disabled if you do not accept the terms', () => {  
      cy.get('[data-cy="check-input"]').should('not.be.checked');      
      cy.get('[data-cy="submit-button"]').should('be.disabled');
    });
  });
  describe("Form input validated", () => {
    it('button enabled for validated inputs', () => {
      cy.get('[data-cy="email-input"]').type("mahmut@gmail.com")
      cy.get('[data-cy="password-input"]').type("1234abcd")
      cy.get('[data-cy="check-input"]').check();   
      cy.get('[data-cy="submit-button"]').should('not.be.disabled');
    });
  });
});
