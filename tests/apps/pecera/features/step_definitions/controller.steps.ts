import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import { assert } from 'chai';
import request from 'supertest';

import { Pecera } from '../../../../../src/apps/pecera/Pecera';
import container from '../../../../../src/apps/pecera/dependency-injection';
import { EnvironmentArranger } from '../../../../Contexts/shared/infrastructure/arranger/EnvironmentArranger';
import { UserMother } from '../../../../Contexts/pecera/Auth/domain/mothers';

const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'pecera.EnvironmentArranger'
);

let _request: request.Test;
let _response: request.Response;
let app: Pecera;
let _jwt: string;

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
  await (await environmentArranger).arrange();
});

AfterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
  await app.stop();
});

Given(
  'a POST request to {string} with body',
  async (route: string, body: string) => {
    _request = request(app.httpServer).post(route).send(JSON.parse(body));
  }
);

Given('a GET request to {string}', (route: string) => {
  _request = request(app.httpServer).get(route);
});

Given('an authenticated GET request to {string}', (route: string) => {
  _request = request(app.httpServer)
    .get(route)
    .set('Authorization', `Bearer ${_jwt}`);
});

Given("a registered user's auth token", async () => {
  const { email, username, password } = UserMother.random();
  await request(app.httpServer).post('/api/v1/Auth/register').send({
    email: email.value,
    username: username.value,
    password: password.value,
    repeatPassword: password.value
  });

  const response = await request(app.httpServer)
    .post('/api/v1/Auth/login')
    .send({
      email: email.value,
      password: password.value
    });
  _jwt = response.body.token;
  assert.isNotEmpty(_jwt);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response body should be', async (docString: string) => {
  assert.deepStrictEqual(_response.body, JSON.parse(docString));
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

Then('the response body should include an auth token', async () => {
  assert.isNotEmpty(_response.body.token);
});

Then('the response body should be empty', async () => {
  assert.isEmpty(_response.body);
});
