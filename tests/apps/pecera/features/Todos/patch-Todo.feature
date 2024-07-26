Feature: Create a new todo
  In order to have a todo to read
  As a user with admin rights
  I want to create a new todo

  # Preconditions for the scenario
  Background:
    Given a registered user's auth token
    Given an authenticated POST request to "/api/v1/Todos" with body
      """
      {
        "id": "659860eb-6d7f-4cb6-b2b4-1ec7707093ef",
        "title": "The Lord of the Rings",
        "category": "travel",
        "description": "Aotearoa",
        "price": "expensive",
        "duration": "long",
        "rank": 5
      }
      """
    Then the response status code should be 201

  Scenario: A valid existing todo
    Given an authenticated PATCH request to "/api/v1/Todos/659860eb-6d7f-4cb6-b2b4-1ec7707093ef" with body
      """
      {
        "title": "new zealand",
        "category": "travel",
        "description": "Aotearoa",
        "price": "expensive",
        "duration": "long",
        "rank": 5
      }
      """
    Then the response status code should be 200
    Then the response body should be empty

    Given an authenticated PATCH request to "/api/v1/Todos/9a6e0804" with body
      """
      {
        "rank": "5",
        "extra": "property"
      }
      """
    Then the response status code should be 400
    Then the response body should be
      """
      {
        "message": "{ id : Invalid value at params. Value: 9a6e0804 , fields : Unknown field <extra> in <body> with value <property> }"
      }
      """
