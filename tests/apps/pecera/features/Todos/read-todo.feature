Feature: Get a specific todo by id
  In order to get a specific todo
  As an user of the API
  I want to get a specific todo by id


  # Preconditions for the scenario
  Background:
    Given a registered user's auth token
    Given an authenticated POST request to "/api/v1/Todos" with body
      """
      {
        "id": "e0ca9d45-2556-49b3-a01b-d1b942c15cc0",
        "title": "The Lord of the Rings",
        "category": "travel",
        "description": "Aotearoa",
        "price": "expensive",
        "duration": "long",
        "rank": 5
      }
      """
    Then the response status code should be 201

  Scenario: Get a specific existing todo by id
    Given an authenticated GET request to "/api/v1/Todos/e0ca9d45-2556-49b3-a01b-d1b942c15cc0"
    Then the response status code should be 200
    Then the response body should contain
      """
      {
        "id": "e0ca9d45-2556-49b3-a01b-d1b942c15cc0"
      }
      """

    Given an authenticated GET request to "/api/v1/Todos/2ce3605c-3c2a-4b81-b905-65f2b76fee1f"
    Then the response status code should be 404
