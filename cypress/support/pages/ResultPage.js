class ResultPage {
  visit() {
    cy.visit('/results');
  }

  getGreetingText() {
    return cy.get('[class="text-center"]');
  }

  getTableHeaders() {
    return cy.get('tbody').find('th');
  }
}

export default new ResultPage;
