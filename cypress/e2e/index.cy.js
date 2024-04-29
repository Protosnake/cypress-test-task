import { checkForResultData, checkValidationMessage } from "../support/helper.js";
import formData from "../fixtures/formData.json"
import formPage from "../support/pages/FormPage.js";
import resultPage from "../support/pages/ResultPage.js"
import { faker } from '@faker-js/faker';

formData.name = faker.internet.userName();
formData.password = faker.internet.password({ length: 8 });

//Some cases are skipped(.skip) because they have bugs
//Some negative cases are skipped bacause it was tested by another tests in Positive test suit 

//If your browser localization is Ukrainian - use this constants:
// const fieldValidationError = "Заповніть це поле.";
// const genderValidationError = "Виберіть один із запропонованих варіантів.";
// const timeValidationError = "Виберіть елемент зі списку.";

const fieldValidationError = "Please fill out this field.";
const genderValidationError = "Please select one of these options.";
const timeValidationError = "Please select an item in the list.";


describe('Positive test scenarios', () => {
  it('Submit form with valid "Name" and "Password" fields, gender, one hobby and time are checked', () => {
    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Confirmation the success submit. . .**");
    cy.wait(3000);

    resultPage.getGreetingText().should('contain', `Greetings, ${formData.name}`)
    checkForResultData(formData);

    formPage.type().should()
  });

  it('Check page loading animation', () => {
    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Checking loading animation. . .**");
    formPage.getPageLoading().should('be.visible');
  });

  it('Submit form with "space" in username', () => {
    formData.name = "Bob Dylan";

    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Confirmation the success submit. . .**");
    cy.wait(3000);
    resultPage.getGreetingText().should('contain', `Greetings, ${formData.name}`);
    checkForResultData(formData);
  });

  it('Submit form with special characters in username', () => {
    formData.name = "bob_dylan#$%";

    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Confirmation the success submit. . .**");
    cy.wait(3000);
    resultPage.getGreetingText().should('contain', `Greetings, ${formData.name}`)
    checkForResultData(formData);
  });

  it('Check "Name" field validation message', () => {
    resultPage.visit();

    formPage.getSubmitButton().click();
    checkValidationMessage('input[type="text"]', fieldValidationError);
  });

  it('Check "Password" field validation message', () => {
    resultPage.visit();

    formPage.getSubmitButton().click();
    checkValidationMessage('input[type="password"]', fieldValidationError);
  });

  it('Check "Gender" radio buttons validation message', () => {
    resultPage.visit();

    formPage.getUsernameInput().type(formData.name);
    formPage.getPasswordInput().type(formData.password);
    formPage.getSubmitButton().click();

    checkValidationMessage('input[value="Male"]', genderValidationError);
  });

  it('Check "Time" select validation message', () => {
    resultPage.visit();

    formPage.getUsernameInput().type(formData.name);
    formPage.getPasswordInput().type(formData.password);
    formPage.checkGenderRadio(formData.gender);
    formPage.getSubmitButton().click();

    checkValidationMessage('select', timeValidationError);
  });

  it('Submit form with WITH NO hobby', () => {
    formData.hobbies = [];

    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Confirmation the success submit. . .**");
    cy.wait(3000);
    resultPage.getGreetingText().should('contain', `Greetings, ${formData.name}`);
    checkForResultData(formData);
  });

  it('Submit form with with three hobbies', () => {
    formData.hobbies = ["Reading", "Sports", "Music"];

    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Confirmation the success submit. . .**");
    cy.wait(3000);

    resultPage.getGreetingText().should('contain', `Greetings, ${formData.name}`)
    checkForResultData(formData);
  });

  it.skip('Submit form with "Noon" in "Time" select', () => {
    formData.time = "Noon";

    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Confirmation the success submit. . .**");
    cy.wait(3000);
    resultPage.getGreetingText().should('contain', `Greetings, ${formData.name}`);
    checkForResultData(formData);
  });

  it.skip('Submit form with "Evening" in "Time" select', () => {
    formData.time = "Evening";

    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Confirmation the success submit. . .**");
    cy.wait(3000)
    resultPage.getGreetingText().should('contain', `Greetings, ${formData.name}`)
    checkForResultData(formData)
  });
});


describe("Negative test scenarios", () => {
  it('Submit form password empty field', () => {
    formData.password = "";

    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.getUsernameInput().type(formData.name);
    formPage.checkGenderRadio(formData.gender);
    formPage.selectTimeDropdown(formData.time);
    formPage.getSubmitButton().click();

    cy.log("**Checking for thye message. . .**");
    checkValidationMessage('input[type="password"]', fieldValidationError);
  });

  it('Submit form with "space" in password field', () => {
    formData.password = "pass word";

    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Confirmation the success submit. . .**");
    cy.wait(3000);

    resultPage.getGreetingText().should('contain', `Greetings, ${formData.name}`)
    checkForResultData(formData);
  });

  it('Submit form with 1 character password length', () => {
    formData.password = "f";

    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Confirmation the success submit. . .**");
    cy.wait(3000);
    resultPage.getGreetingText().should('contain', `Greetings, ${formData.name}`);
    checkForResultData(formData);
  });

  it('Submit form with 100 character password length', () => {
    formData.password = faker.internet.password({ length: 100 });

    resultPage.visit();

    cy.log("**Filling the form and confirming. . .**");
    formPage.fillRequiredFieldsViaUI(formData);
    formPage.getSubmitButton().click();

    cy.log("**Confirmation the success submit. . .**");
    cy.wait(3000);
    resultPage.getGreetingText().should('contain', `Greetings, ${formData.name}`);
    checkForResultData(formData);
  });
});
