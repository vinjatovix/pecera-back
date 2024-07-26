import { UserFinder } from '../../../../../src/Contexts/pecera/Auth/application/UserFinder';
import { random } from '../../../fixtures/shared';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';

describe('UserFinder', () => {
  let repository: UserRepositoryMock;
  let service: UserFinder;

  beforeEach(() => {
    repository = new UserRepositoryMock({ exists: true });
    service = new UserFinder(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return complete user info to an admin', async () => {
    const request = {
      username: random.word({ min: 5, max: 10 }),
      appRoles: ['admin']
    };

    const response = await service.run(request);

    repository.assertFindByUsernameHasBeenCalledWith(request.username);
    expect(response).toHaveProperty('email');
  });

  it('should return partial user info to a non-admin', async () => {
    const request = {
      username: random.word({ min: 5, max: 10 }),
      appRoles: ['user']
    };

    const response = await service.run(request);

    repository.assertFindByUsernameHasBeenCalledWith(request.username);
    expect(response).not.toHaveProperty('email');
    expect(response).toHaveProperty('emailValidated');
  });

  it('should throw an error when the user does not exist', async () => {
    repository = new UserRepositoryMock({ exists: false });
    service = new UserFinder(repository);

    const request = {
      username: random.word({ min: 5, max: 10 }),
      appRoles: ['admin']
    };

    await expect(service.run(request)).rejects.toThrow(
      `User <${request.username}> not found`
    );
  });
});
