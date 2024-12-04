Feature: expect

  Background:
    When I drop file 'file.txt' to './test-e2e/folder' after 800 ms

  Scenario: expect file
    When I expect './test-e2e/folder/file.txt' file exists
  Scenario: wait for file matching regexp in folder
    When I expect file matching 'f.+\.txt' regexp exists in './test-e2e/folder'

  Scenario: expect file from memory
    When I expect '$filePath' file exists

  Scenario: expect file matching regexp from memory in folder
    When I expect file matching '$fileRegexp' regexp exists in '$folder'
