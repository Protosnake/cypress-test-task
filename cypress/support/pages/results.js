class ResultPage {
  verifyUrl(expectedUrl) {
    cy.url().should("eq", expectedUrl);
    return this;
  }

  verifyHeader(username) {
    cy.get("h1").then(($header) => {
      const headerText = $header.text().trim();
      expect(headerText).to.eq(`Greetings, ${username}`);
    });
    return this;
  }

  verifyTextNotOverflowing() {
    cy.get(".container").then(($container) => {
      const containerWidth = $container.width();
      cy.get("h1").should(($header) => {
        const headerWidth = $header.width();
        expect(headerWidth).to.be.lte(containerWidth, "Header in box");
      });
    });
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
          if (i === 0) return expect(text).to.equal(tableData[0]);
          if (i === 1) return expect(text).to.be.empty;
          if (i === 2) return expect(text).to.equal(tableData[1]);
        }
      });
    return this;
  }
}

export default ResultPage;
