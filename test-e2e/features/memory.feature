Feature: memory

  Scenario: save as buffer
    When I save 'test-e2e/static-folder/someTextFile.txt' file content as 'fileContent'
    Then I expect '$fileContent' memory value to be equal '$buffer'

  Scenario: save as text
    When I save 'test-e2e/static-folder/someTextFile.txt' text file content as 'fileContent'
    Then I expect '$fileContent' memory value to be equal '$textContent'

  Scenario: save as Excel
    When I save 'test-e2e/static-folder/excel.xlsx' Excel file content as 'excelContent'
    Then I expect '$excelContent.Sheets.QAVAJS.A1.v' memory value to be equal 'qavajs'

  Scenario: save as Excel97
    When I save 'test-e2e/static-folder/excel.xls' Excel file content as 'excelContent97'
    Then I expect '$excelContent97.Sheets.QAVAJS.A1.v' memory value to be equal 'qavajs'

  Scenario: save as pdf
    When I save 'test-e2e/static-folder/pdf.pdf' pdf file content as 'pdf'
    Then I expect '$pdf.textMultiLine' memory value to contain 'This is a header'

  Scenario: save as Excel from buffer
    When I save 'test-e2e/static-folder/excel.xlsx' file content as 'fileContent'
    When I save '$fileContent' Excel file content as 'excelContent'
    Then I expect '$excelContent.Sheets.QAVAJS.A1.v' memory value to be equal 'qavajs'

  Scenario: save as Excel97 from buffer
    When I save 'test-e2e/static-folder/excel.xls' file content as 'fileContent'
    When I save '$fileContent' Excel file content as 'excelContent97'
    Then I expect '$excelContent97.Sheets.QAVAJS.A1.v' memory value to be equal 'qavajs'

  Scenario: save as pdf from buffer
    When I save 'test-e2e/static-folder/pdf.pdf' file content as 'fileContent'
    When I save '$fileContent' pdf file content as 'pdf'
    Then I expect '$pdf.textMultiLine' memory value to contain 'This is a header'

  Scenario: save as Word
    When I save 'test-e2e/static-folder/word.docx' Word file content as 'word'
    Then I expect '$word.textSingleLine' memory value to contain 'Test for qavajs Next line'
    Then I expect '$word.textMultiLine' memory value to contain 'Test for qavajs'
    Then I expect '$word.textMultiLine' memory value to contain 'Next line'

  Scenario: save as Word from buffer
    When I save 'test-e2e/static-folder/word.docx' file content as 'fileContent'
    When I save '$fileContent' Word file content as 'word'
    Then I expect '$word.textSingleLine' memory value to contain 'Test for qavajs Next line'
    Then I expect '$word.textMultiLine' memory value to contain 'Test for qavajs'
    Then I expect '$word.textMultiLine' memory value to contain 'Next line'

  Scenario: save as csv
    When I save 'test-e2e/static-folder/csv.csv' csv file content as 'csvContent'
    Then I expect '$csvContent[0].qavajs' memory value to be equal '$js(1)'
    And I expect '$csvContent[1]["three word column"]' memory value to be equal 'string'
