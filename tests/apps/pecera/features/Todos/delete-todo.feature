Feature: Delete a specific todo
  In order to delete a specific todo
  As an user of the API
  I want to delete a specific todo by id

  # Preconditions for the scenario
  Background:
    Given a registered user's auth token
    Given an authenticated POST request to "/api/v1/Todos" with body
      """
      {
        "id": "eac2d4ef-1fad-4b94-9f2b-6a7e1b25a885",
        "title": "New Zealand",
        "category": "travel",
        "description": "Aotearoa",
        "price": "expensive",
        "duration": "long",
        "rank": 5
      }
      """
    Then the response status code should be 201

  Scenario: Delete a specific existing todo by id
    Given an authenticated DELETE request to "/api/v1/Todos/eac2d4ef-1fad-4b94-9f2b-6a7e1b25a885"
    Then the response status code should be 204
    Then the response body should be empty
