Feature: Refresh Token

  Background:
    Given a registered user's auth token

  Scenario: Refresh token
    Given an authenticated GET request to "/api/v1/Auth/refreshToken"
    Then the response status code should be 200
    Then the response body should include an auth token

  Scenario: Fail with invalid token
    Given a GET request to "/api/v1/Auth/refreshToken"
    Then the response status code should be 401
    Then the response body should be
      """
      {
        "message": "Invalid token"
      }
      """
