import { generateUser } from "./generate";

import { pauseValue } from "./test-data";

export class YourAverageForm {
  constructor() {
    this.pageTitle = 'h1';
    this.usernameField = '#username';
    this.passwordField = '#password';
    this.timeOfDayField = '#time';
    this.submitButton = 'button[type="submit"]';
    this.loader = 'div[class="overlay"]';

    this.user = generateUser();
  }

  pickGender(gender) {
    cy.contains('label[class="form-check-label"]', gender)
      .click();
  }

  pickHobbies(hobbies) {
    for (const hobby of hobbies) {
      cy.get(`input[name="hobby"][value=${hobby}]`)
        .click();
    }
  }

  fillUserInfo() {
    const {
      username,
      password,
      gender,
      hobbies,
      timeOfDay
    } = this.user;

    if (this.user.username) {
      cy.get(this.usernameField)
        .type(username);
    }

    if (this.user.password) {
      cy.get(this.passwordField)
        .type(password);
    }
    
    if (this.user.gender) {
      this.pickGender(gender);
    }

    this.pickHobbies(hobbies);

    if (this.user.timeOfDay) {
      cy.get(this.timeOfDayField)
        .select(timeOfDay);
    }
  }

  submitBtnClick() {
    cy.get(this.submitButton)
      .click();
  }

  assertInputValidated() {
    cy.get(this.loader)
      .should('exist');

    cy.get(this.loader)
      .should('not.exist', { timeout: 10000 });
  }

  assertUserCreated() {
    const {
      username,
      gender,
      hobbies,
      timeOfDay
    } = this.user;

    this.assertInputValidated();

    cy.url()
      .should('contain', 'results');

    cy.get(this.pageTitle)
      .should('contain.text', `Greetings, ${username}`);

    cy.contains('tr', 'Gender')
      .should('contain', gender);

    if (hobbies.length) {
      for (const hobby of hobbies) {
        cy.contains('tr', 'Hobbies')
          .should('contain', hobby);
      }
    } else {
      cy.contains('tr', 'Hobbies')
        .find('td')
        .then((td) => {
          const text = td.text().trim();
          expect(text).to.equal('');
        });
    }

    cy.contains('tr', 'Time')
      .should('contain', timeOfDay);
  }

  assertUserNotCreated() {
    cy.wait(pauseValue);

    cy.get(this.loader)
      .should('not.exist');

    cy.url()
      .should('not.include', 'results');
  }
}