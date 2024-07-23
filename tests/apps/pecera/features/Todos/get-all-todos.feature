Feature: Get all todos in the collection
  In order to see all todos in the collection
  As a user

  #preconditions for the scenario
  Background:
    Given a registered user's auth token
    Given an authenticated POST request to "/api/v1/Todos" with body
      """
      {
        "id": "7f440439-5207-450a-a3aa-10bab546698a",
        "title": "New Zealand",
        "category": "travel",
        "description": "Aotearoa",
        "price": "expensive",
        "duration": "long",
        "rank": 5
      }
      """
    Then the response status code should be 201

    Given an authenticated POST request to "/api/v1/Todos" with body
      """
      {
        "id": "0baa8fe0-47e5-4b49-a698-e8fbb68a2c2d",
        "title": "The Lord of the Rings 2",
        "category": "travel",
        "description": "Aotearoa",
        "price": "expensive",
        "duration": "short",
        "rank": 5
      }
      """
    Then the response status code should be 201

  Scenario: Get all todos in the collection
    Given an authenticated GET request to "/api/v1/Todos"
    Then the response status code should be 200
    Then the response body will be an array containing
      """
      {
        "id": "7f440439-5207-450a-a3aa-10bab546698a"
      }
      """
    Then the response body will be an array containing
      """
      {
        "id": "0baa8fe0-47e5-4b49-a698-e8fbb68a2c2d"
      }
      """
