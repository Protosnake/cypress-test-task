import FormPage from "../support/pages/form";
import ResultPage from "../support/pages/results";

describe("Test Form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("userData.json").as("userData");
  });

  it("Submit form with all fields filled", function () {
    const gender = "Male";
    const hobby = ["Reading", "Sports"];
    const time = "Morning";
    const tableData = [gender, hobby, time];

    const formPage = new FormPage();
    const resultPage = new ResultPage();

    formPage
      .typeInputByLabel("Username", "text", this.userData.userName)
      .typeInput("password", this.userData.password)
      .chooseGenderByLabel(gender)
      .chooseHobby(hobby)
      .selectTime(time)
      .submit()
      .checkLoading();
    resultPage
      .verifyUrl(Cypress.env("resultUrl"))
      .verifyUsername(this.userData.userName)
      .verifyTableData(tableData);
  });

  it("Submit form with no fields filled", function () {
    const formPage = new FormPage();

    formPage
      .submit()
      .validateRequiredTextField("text")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with username only", function () {
    const formPage = new FormPage();

    formPage
      .typeInput("text", this.userData.userName)
      .submit()
      .validateRequiredTextField("password")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with username and password", function () {
    const formPage = new FormPage();

    formPage
      .typeInput("text", this.userData.userName)
      .typeInputByLabel("Password", "password", this.userData.password)
      .submit()
      .validateRequiredRadioButton("password")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with username, password and gender", function () {
    const gender = "Female";

    const formPage = new FormPage();

    formPage
      .typeInput("text", this.userData.userName)
      .typeInputByLabel("Password", "password", this.userData.password)
      .chooseGenderByRadioButton(gender)
      .submit()
      .validateRequiredTimeSelect()
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with username, password, gender and time", function () {
    const gender = "Female";
    const time = "Noon";
    const tableData = [gender, time];

    const formPage = new FormPage();
    const resultPage = new ResultPage();

    formPage
      .typeInputByLabel("Username", "text", this.userData.userName)
      .typeInput("Password", this.userData.password)
      .chooseGenderByLabel(gender)
      .selectTime(time)
      .submit()
      .checkLoading();
    resultPage
      .verifyUrl(Cypress.env("resultUrl"))
      .verifyUsername(this.userData.userName)
      .verifyTableData(tableData);
  });

  it("Submit form with username, gender and hobbies", function () {
    const gender = "Female";
    const hobbies = ["Reading", "Music"];

    const formPage = new FormPage();

    formPage
      .typeInputByLabel("Username", "text", this.userData.userName)
      .chooseGenderByLabel(gender)
      .chooseHobby(hobbies)
      .submit()
      .validateRequiredTextField("password")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form without username", function () {
    const gender = "Male";
    const hobbies = "Reading";
    const time = "Evening";

    const formPage = new FormPage();

    formPage
      .typeInput("password", this.userData.password)
      .chooseGenderByLabel(gender)
      .chooseHobby(hobbies)
      .selectTime(time)
      .submit()
      .validateRequiredTextField("text")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with all fields filled - XSS attack", function () {
    const gender = "Male";
    const hobby = "Reading";
    const time = "Morning";
    const tableData = [gender, hobby, time];

    const formPage = new FormPage();
    const resultPage = new ResultPage();

    formPage
      .typeInputByLabel("Username", "text", this.userData.XSS)
      .typeInput("password", this.userData.password)
      .chooseGenderByLabel(gender)
      .chooseHobby(hobby)
      .selectTime(time)
      .submit()
      .checkLoading();
    resultPage
      .verifyUrl(Cypress.env("resultUrl"))
      .verifyUsername(this.userData.XSS)
      .verifyTableData(tableData);
  });

  it("Submit form with username and password - XSS attack", function () {
    const formPage = new FormPage();

    formPage
      .typeInput("text", this.userData.XSS)
      .typeInputByLabel("Password", "password", this.userData.password)
      .submit()
      .validateRequiredRadioButton("password")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });
});
