Feature: validations

  Scenario: text file content
    When I expect 'test-e2e/static-folder/someTextFile.txt' text file content to contain 'this is text file content'
    When I expect 'test-e2e/static-folder/someTextFile.txt' text file content not to be equal 'wrong value'
    When I expect 'test-e2e/static-folder/someTextFile.txt' text file content to match '^this is text file.+'
