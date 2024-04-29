import { checkHobby } from '../helper.js';
import formData from '../../fixtures/formData.json'

class FormPage {
  visit() {
    cy.visit('/');
  }

  getUsernameInput() {
    return cy.get("#username");
  }

  getPasswordInput() {
    return cy.get('[type="password"]');
  }

  checkGenderRadio(genderValue) {
    return cy.get(`input[type="radio"][value="${genderValue}"]`).check();
  }

  getCheckHobbyCheckbox(hobbyValue) {
    return cy.get(`input[value="${hobbyValue}"]`);
  }

  selectTimeDropdown(time) {
    return cy.get('#time').select(time);
  }

  getSubmitButton() {
    return cy.get('[type="submit"]');
  }

  getPageLoading() {
    return cy.get('#loading');
  }

  fillRequiredFieldsViaUI(user) {
    this.getUsernameInput().type(formData.name);
    this.getPasswordInput().type(formData.password);
    this.checkGenderRadio(formData.gender);

    checkHobby(formData.hobbies);

    this.selectTimeDropdown(formData.time);
  }
}

export default new FormPage;
