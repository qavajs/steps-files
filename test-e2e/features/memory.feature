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

