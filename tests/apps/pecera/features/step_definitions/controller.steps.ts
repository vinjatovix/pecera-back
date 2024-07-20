import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import chai, { assert } from 'chai';
import request from 'supertest';

import { Pecera } from '../../../../../src/apps/pecera/Pecera';

const expect = chai.expect;
let _request: request.Test;
let app: Pecera;

const compareResponseObject = <T>(
  responseObj: T,
  expectedObj: Partial<T>
): boolean => {
  return Object.entries(expectedObj).every(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(responseObj, key)) {
      if (typeof value === 'object' && value !== null) {
        return Object.entries(value).every(
          ([subKey, subValue]: [string, unknown]) => {
            const typedSubKey = subKey as keyof typeof value;
            return (
              (responseObj[key as keyof T] as Record<string, unknown>)[
                typedSubKey
              ] === subValue
            );
          }
        );
      } else {
        return responseObj[key as keyof T] === value;
      }
    } else {
      return false;
    }
  });
};

BeforeAll(async () => {
  app = new Pecera();
  await app.start();
});

AfterAll(async () => {
  await app.stop();
});

Given('a GET request to {string}', (route: string) => {
  _request = request(app.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  const response = await _request;
  expect(response.status).to.be.equal(status);
});

Then('the response body should contain', async (docString: string) => {
  const response = await _request;
  const expectedResponseBody = JSON.parse(docString);

  const matches = compareResponseObject(response.body, expectedResponseBody);

  assert.isTrue(
    matches,
    'Expected response body to match the expected response body'
  );
});
