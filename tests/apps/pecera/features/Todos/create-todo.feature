Feature: Create a new todo
  I want to create a new todo

  Scenario: A valid non existing todo
    Given a registered user's auth token
    Given an authenticated POST request to "/api/v1/Todos/" with body
      """
      {
        "id": "7e6612ed-9350-44cb-96d4-130979cca08a",
        "title": "Go to New Zealand",
        "category": "travel",
        "description": "To LOTR set",
        "price": "expensive",
        "duration": "long",
        "rank": 5
      }
      """
    Then the response status code should be 201
    Then the response body should be empty

  Scenario: An ivalid non existing todo
    Given an authenticated POST request to "/api/v1/Todos" with body
      """
      {
        "author": 56,
        "isbn": "AAA-3-16-148410-0",
        "releaseDate": "AAAAA",
        "pages": "ad3f3210",
        "extra": "property"
      }
      """
    Then the response status code should be 400
    Then the response body should be
      """
      {
        "message": "{ id : Invalid value at body. Value: undefined , title : Invalid value at body. Value: undefined , category : Invalid value at body. Value: undefined , description : Invalid value at body. Value: undefined , duration : Invalid value at body. Value: undefined , price : Invalid value at body. Value: undefined , rank : Invalid value at body. Value: undefined , fields : Unknown field <author> in <body> with value <56>,Unknown field <isbn> in <body> with value <AAA-3-16-148410-0>,Unknown field <releaseDate> in <body> with value <AAAAA>,Unknown field <pages> in <body> with value <ad3f3210>,Unknown field <extra> in <body> with value <property> }"
      }
      """

  Scenario: A non authenticated user
    Given a POST request to "/api/v1/Todos" with body
      """
      {
        "id": "7e6612ed-9350-44cb-96d4-130979cca08a",
        "title": "Go to New Zealand",
        "category": "travel",
        "description": "To LOTR set",
        "price": "expensive",
        "duration": "long",
        "rank": 5
      }
      """
    Then the response status code should be 401
    Then the response body should be
      """
      {
        "message": "Invalid token"
      }
      """
