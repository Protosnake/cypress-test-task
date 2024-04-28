import FormPage from "../support/pages/form";
import ResultPage from "../support/pages/results";

describe("Positive scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("userData.json").as("userData");
  });

  it("Submit form with field interactions, validate input methods, and ensure unique gender selection", function () {
    const username = this.userData.userNameNormal;
    const password = this.userData.passwordNormal;
    const genderFemale = this.userData.genderFemale;
    const genderMale = this.userData.genderMale;
    const hobbies = [
      this.userData.hobbyReading,
      this.userData.hobbySports,
      this.userData.hobbyMusic,
    ];
    const time = this.userData.timeMorning;
    const resultData = [genderFemale, hobbies, time];

    const formPage = new FormPage();
    const resultPage = new ResultPage();

    formPage
      .typeInputByLabel("Username", "text", username)
      .typeInput("password", password)
      .chooseGenderByLabel(genderMale)
      .chooseGenderByRadioButton(genderFemale)
      .checkOtherRadioButtonsNotChecked(genderFemale)
      .chooseHobby(hobbies)
      .selectTime(time)
      .submit()
      .checkLoading();
    resultPage
      .verifyUrl(Cypress.env("resultUrl"))
      .verifyHeader(username)
      .verifyTextNotOverflowing()
      .verifyTableData(resultData);
  });

  it("Submit the form with a special character password, ensure gender radio selection, and validate with no hobbies chosen", function () {
    const username = this.userData.userNameNormal;
    const password = this.userData.passwordWithSpecialChars;
    const genderMale = this.userData.genderMale;
    const time = this.userData.timeEvening;
    const resultData = [genderMale, time];

    const formPage = new FormPage();
    const resultPage = new ResultPage();

    formPage
      .typeInput("text", username)
      .typeInputByLabel("Password", "password", password)
      .chooseGenderByRadioButton(genderMale)
      .checkOtherRadioButtonsNotChecked(genderMale)
      .selectTime(time)
      .submit()
      .checkLoading();
    resultPage
      .verifyUrl(Cypress.env("resultUrl"))
      .verifyHeader(username)
      .verifyTextNotOverflowing()
      .verifyTableData(resultData);
  });

  it("Submit the form with long username and validate gender radio button against double click", function () {
    const username = this.userData.userNameLong;
    const password = this.userData.passwordShort;
    const genderFemale = this.userData.genderFemale;
    const hobbies = this.userData.hobbyReading;
    const time = this.userData.timeNoon;
    const resultData = [genderFemale, hobbies, time];

    const formPage = new FormPage();
    const resultPage = new ResultPage();

    formPage
      .typeInput("text", username)
      .typeInput("password", password)
      .chooseGenderByRadioButtonDoubleClick(genderFemale)
      .checkOtherRadioButtonsNotChecked(genderFemale)
      .chooseHobby(hobbies)
      .selectTime(time)
      .submit()
      .checkLoading();
    resultPage
      .verifyUrl(Cypress.env("resultUrl"))
      .verifyHeader(username)
      .verifyTextNotOverflowing()
      .verifyTableData(resultData);
  });

  it("Submit form with username containing spaces, validate double click on gender label, and test multiple selections in dropdown", function () {
    const username = this.userData.userNameWithSpace;
    const password = this.userData.passwordLong;
    const genderFemale = this.userData.genderFemale;
    const hobbies = this.userData.hobbySports;
    const timeFirstChoose = this.userData.timeNoon;
    const timeSecondChoose = this.userData.timeEvening;
    const resultData = [genderFemale, hobbies, timeSecondChoose];

    const formPage = new FormPage();
    const resultPage = new ResultPage();

    formPage
      .typeInput("text", username)
      .typeInput("password", password)
      .chooseGenderByLabelDoubleClick(genderFemale)
      .checkOtherRadioButtonsNotChecked(genderFemale)
      .chooseHobby(hobbies)
      .selectTime(timeFirstChoose)
      .selectTime(timeSecondChoose)
      .submit()
      .checkLoading();
    resultPage
      .verifyUrl(Cypress.env("resultUrl"))
      .verifyHeader(username)
      .verifyTextNotOverflowing()
      .verifyTableData(resultData);
  });

  it("Submit form with extremely long username and password, and verify correct form submission", function () {
    const username = this.userData.userNameExtrymelyLong;
    const password = this.userData.passwordExtrymelyLong;
    const genderMale = this.userData.genderMale;
    const hobbies = this.userData.hobbyMusic;
    const time = this.userData.timeNoon;
    const resultData = [genderMale, hobbies, time];

    const formPage = new FormPage();
    const resultPage = new ResultPage();

    formPage
      .typeInput("text", username)
      .typeInputByLabel("Password", "password", password)
      .chooseGenderByRadioButton(genderMale)
      .checkOtherRadioButtonsNotChecked(genderMale)
      .chooseHobby(hobbies)
      .selectTime(time)
      .submit()
      .checkLoading();
    resultPage
      .verifyUrl(Cypress.env("resultUrl"))
      .verifyHeader(username)
      .verifyTextNotOverflowing()
      .verifyTableData(resultData);
  });
});

describe("Negative scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("userData.json").as("userData");
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
    const username = this.userData.userNameNormal;

    const formPage = new FormPage();

    formPage
      .typeInput("text", username)
      .submit()
      .validateRequiredTextField("password")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with password only", function () {
    const password = this.userData.passwordLong;

    const formPage = new FormPage();

    formPage
      .typeInput("password", password)
      .submit()
      .validateRequiredTextField("text")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with gender only", function () {
    const genderFemale = this.userData.genderFemale;

    const formPage = new FormPage();

    formPage
      .chooseGenderByLabel(genderFemale)
      .submit()
      .validateRequiredTextField("text")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with hobbies only", function () {
    const hobbies = this.userData.hobbyReading;

    const formPage = new FormPage();

    formPage
      .chooseHobby(hobbies)
      .submit()
      .validateRequiredTextField("text")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with time only", function () {
    const time = this.userData.timeMorning;

    const formPage = new FormPage();

    formPage
      .selectTime(time)
      .submit()
      .validateRequiredTextField("text")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with username and password", function () {
    const username = this.userData.userNameNormal;
    const password = this.userData.passwordLong;

    const formPage = new FormPage();

    formPage
      .typeInput("text", username)
      .typeInput("password", password)
      .submit()
      .validateRequiredRadioButton()
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with username and gender", function () {
    const username = this.userData.userNameNormal;
    const genderMale = this.userData.genderMale;

    const formPage = new FormPage();

    formPage
      .typeInput("text", username)
      .chooseGenderByLabel(genderMale)
      .submit()
      .validateRequiredTextField("password")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with password and time", function () {
    const password = this.userData.passwordLong;
    const time = this.userData.timeNoon;

    const formPage = new FormPage();

    formPage
      .typeInput("password", password)
      .selectTime(time)
      .submit()
      .validateRequiredTextField("text")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with gender and hobbies", function () {
    const genderMale = this.userData.genderMale;
    const hobbies = this.userData.hobbyReading;

    const formPage = new FormPage();

    formPage
      .chooseGenderByLabel(genderMale)
      .chooseHobby(hobbies)
      .submit()
      .validateRequiredTextField("text")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with username, password and gender", function () {
    const username = this.userData.userNameNormal;
    const password = this.userData.passwordLong;
    const genderFemale = this.userData.genderFemale;

    const formPage = new FormPage();

    formPage
      .typeInput("text", username)
      .typeInput("password", password)
      .chooseGenderByLabel(genderFemale)
      .submit()
      .validateRequiredTimeSelect()
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with username, gender and time", function () {
    const username = this.userData.userNameNormal;
    const genderFemale = this.userData.genderFemale;
    const time = this.userData.timeEvening;

    const formPage = new FormPage();

    formPage
      .typeInput("text", username)
      .chooseGenderByLabel(genderFemale)
      .selectTime(time)
      .submit()
      .validateRequiredTextField("password")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with password, gender and hobbies", function () {
    const password = this.userData.passwordLong;
    const genderFemale = this.userData.genderFemale;
    const hobbies = this.userData.hobbyReading;

    const formPage = new FormPage();

    formPage
      .typeInput("password", password)
      .chooseGenderByLabel(genderFemale)
      .chooseHobby(hobbies)
      .submit()
      .validateRequiredTextField("text")
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });

  it("Submit form with username, password, gender and hobbies", function () {
    const username = this.userData.userNameNormal;
    const password = this.userData.passwordLong;
    const genderFemale = this.userData.genderFemale;
    const hobbies = this.userData.hobbyReading;

    const formPage = new FormPage();

    formPage
      .typeInput("text", username)
      .typeInput("password", password)
      .chooseGenderByLabel(genderFemale)
      .chooseHobby(hobbies)
      .submit()
      .validateRequiredTimeSelect()
      .checkUrl(Cypress.env("baseUrl"))
      .checkHeaderForm();
  });
});
