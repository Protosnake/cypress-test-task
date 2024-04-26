class ResultPage {
  verifyUrl(expectedUrl) {
    cy.url().should("eq", expectedUrl);
    return this;
  }

  verifyUsername(username) {
    cy.get("h1").should("contain", username);
    return this;
  }

  verifyTableData(tableData) {
    cy.get("tbody")
      .find("tr")
      .find("td")
      .each((el, i) => {
        const text = Cypress.$(el).text().trim();

        if (tableData.length === 3) {
          expect(text).to.contain(tableData[i]);
        } else if (tableData.length === 2) {
          if (i === 0) return expect(text).to.contain(tableData[0]);
          if (i === 1) return expect(text).to.be.empty;
          if (i === 2) return expect(text).to.contain(tableData[1]);
        }
      });
    return this;
  }
}

export default ResultPage;
