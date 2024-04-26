const { YourAverageForm } = require("../../pageObject");

let form;

describe('Your Average Form', () => {
  beforeEach(() => {
    cy.visit('/');

    form = new YourAverageForm();
  });

  it('should have the right title', () => {
    cy.get(form.pageTitle)
      .should('have.text', 'Your average form');
  });

  it('should have a password field with type password', () => {
    cy.get(form.passwordField)
      .should('have.attr', 'type', 'password');
  });

  it('should submit the form with valid data', () => {
    form.fillUserInfo();

    form.submitBtnClick();
    
    form.assertUserCreated();
  });

  it('should not submit the form without a username', () => {
    form.user.username = '';

    cy.get(form.usernameField)
      .should('have.attr', 'required');

    form.fillUserInfo();

    form.submitBtnClick();

    form.assertUserNotCreated();
  });

  it('should not submit the form without a password', () => {
    form.user.password = '';

    cy.get(form.passwordField)
      .should('have.attr', 'required');

    form.fillUserInfo();

    form.submitBtnClick();

    form.assertUserNotCreated();
  });

  it('should not submit the form without a gender', () => {
    form.user.gender = '';

    cy.get('input[type="radio"]')
      .should('have.attr', 'required');

    form.fillUserInfo();

    form.submitBtnClick();

    form.assertUserNotCreated();
  });

  it('should not submit the form without a time of day', () => {
    form.user.timeOfDay = '';

    cy.get(form.timeOfDayField)
      .should('have.attr', 'required');

    form.fillUserInfo();

    form.submitBtnClick();

    form.assertUserNotCreated();
  });

  it('should trim a username value', () => {
    form.user.username = ' ';

    form.fillUserInfo();

    form.submitBtnClick();

    form.assertUserNotCreated();
  });
});