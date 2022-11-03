Feature: waits

  Background:
    When I drop file 'file.txt' to './test-e2e/folder' after 800 ms

  Scenario: wait for file
    When I wait until './test-e2e/folder/file.txt' file appears

  Scenario: wait for file matching regexp in folder
    When I wait until file matching 'f.+\.txt' regexp appears in './test-e2e/folder'

  Scenario: wait for file from memory
    When I wait until '$filePath' file appears

  Scenario: wait for file matching regexp from memory in folder
    When I wait until file matching '$fileRegexp' regexp appears in '$folder'
