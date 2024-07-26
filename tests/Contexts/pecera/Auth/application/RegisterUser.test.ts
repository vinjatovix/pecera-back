import { RegisterUser } from '../../../../../src/Contexts/pecera/Auth/application';
import {
  UserFriends,
  Username,
  UserRoles
} from '../../../../../src/Contexts/pecera/Auth/domain';

import {
  Email,
  StringValueObject
} from '../../../../../src/Contexts/shared/domain/value-object';
import { CryptAdapterMock } from '../__mocks__/CryptAdapterMock';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { RegisterUserRequestMother } from './mothers/RegisterUserRequestMother';

describe('RegisterUser', () => {
  let encrypter: CryptAdapterMock;
  let repository: UserRepositoryMock;
  let registerUser: RegisterUser;

  beforeEach(() => {
    encrypter = new CryptAdapterMock({ login: false });
    repository = new UserRepositoryMock({ exists: false });
    registerUser = new RegisterUser(repository, encrypter);
  });

  it('should register a valid user', async () => {
    const request = RegisterUserRequestMother.random();

    await registerUser.run(request);

    repository.assertSearchHasBeenCalledWith(request.email);
    repository.assertSaveHasBeenCalledWith(
      expect.objectContaining({
        email: expect.any(Email),
        username: expect.any(Username),
        password: expect.any(StringValueObject),
        emailValidated: expect.any(Boolean),
        roles: expect.any(UserRoles),
        metadata: expect.any(Object),
        friends: expect.any(UserFriends)
      })
    );
  });

  it('should throw an error when the user already exists', async () => {
    const request = RegisterUserRequestMother.random();
    repository = new UserRepositoryMock({ exists: true });
    registerUser = new RegisterUser(repository, encrypter);

    expect(async () => {
      await registerUser.run(request);
    }).rejects.toThrow(`User <${request.email}> already exists`);
  });
});
