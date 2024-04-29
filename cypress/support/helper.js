
import formPage from './pages/FormPage';
import resultPage from './pages/ResultPage';

export function checkHobby(hobbyObj) {
  hobbyObj.forEach(hobby => {
    formPage.getCheckHobbyCheckbox(hobby).check().should('be.checked');
  })
}

export function checkForResultData(data) {
    let expectedTable = [
      { key: 'Gender', value: data.gender },
      { key: 'Hobbies', value: data.hobbies.join(",") },
      { key: 'Time', value: data.time }
    ]
  
    resultPage.getTableHeaders().each(($th, index) => {
    const expectedRow = expectedTable[index];

    const columnText = $th.text().trim();
    const columnValue = $th.next("td").text().trim();

    expect(columnText).to.equal(expectedRow.key);
    expect(columnValue).to.equal(expectedRow.value);
  })
}

export function checkValidationMessage(selector, errorMessage) {
  cy.get(`${selector}:invalid`).should('have.length', 1);
  cy.get(`${selector}`).then(($input) => {
    expect($input[0].validationMessage).to.eq(`${errorMessage}`);
  })
}
