class FormPage {
  checkHeaderForm() {
    cy.get("h1").should("have.text", "Your average form");
    return this;
  }

  typeInputByLabel(labelName, inputType, value) {
    cy.get("label").contains(labelName).click().type(value);
    cy.get(`input[type=${inputType}]`).should("have.value", value);
    return this;
  }

  typeInput(inputType, value) {
    cy.get(`input[type=${inputType}]`).type(value).should("have.value", value);
    return this;
  }

  validateRequiredTextField(inputType) {
    cy.get(`input[type=${inputType}]:invalid`).should("exist");
    cy.get(`input[type=${inputType}]`).then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill in this field.");
    });
    return this;
  }

  chooseGenderByLabel(value) {
    cy.get("label").contains(value).click();
    cy.get(`input[type="radio"][name="gender"][value=${value}]`).should(
      "be.checked"
    );
    return this;
  }
  chooseGenderByLabelDoubleClick(value) {
    cy.get("label").contains(value).click();
    cy.get("label").contains(value).click();
    cy.get(`input[type="radio"][name="gender"][value=${value}]`).should(
      "be.checked"
    );
    return this;
  }

  chooseGenderByRadioButton(value) {
    cy.get(`input[type="radio"][name="gender"][value=${value}]`)
      .click()
      .should("be.checked");
    return this;
  }
  chooseGenderByRadioButtonDoubleClick(value) {
    cy.get(`input[type="radio"][name="gender"][value=${value}]`)
      .click()
      .should("be.checked");
    cy.get(`input[type="radio"][name="gender"][value=${value}]`)
      .click()
      .should("be.checked");
    return this;
  }

  checkOtherRadioButtonsNotChecked(value) {
    cy.get(`input[type="radio"][name="gender"]`).each(($btn) => {
      if ($btn.val() !== value) {
        cy.wrap($btn).should("not.be.checked");
      }
    });
    return this;
  }

  validateRequiredRadioButton() {
    cy.get(`input[type="radio"]:invalid`).should("exist");
    cy.get(`input[type="radio"]`).then(($input) => {
      expect($input[0].validationMessage).to.eq(
        "Please select one of these options."
      );
    });
    return this;
  }

  chooseHobby(value) {
    const hobbies = Array.isArray(value) ? value : [value];

    hobbies.forEach((hobby) => {
      cy.get(`input[name="hobby"][value="${hobby}"]`)
        .click()
        .should("be.checked");
    });
    return this;
  }

  selectTime(value) {
    cy.get('select[id="time"]').select(value).should("have.value", value);
    return this;
  }

  validateRequiredTimeSelect() {
    cy.get('select[id="time"]:invalid').should("exist");
    cy.get('select[id="time"]').then(($input) => {
      expect($input[0].validationMessage).to.eq(
        "Please select an item in the list."
      );
    });
    return this;
  }

  submit() {
    cy.get("button[type='submit']").click();
    return this;
  }

  checkLoading() {
    cy.get(".overlay").should("be.visible");
    return this;
  }

  checkUrl(expectedUrl) {
    cy.url().should("eq", expectedUrl);
    return this;
  }
}
export default FormPage;
