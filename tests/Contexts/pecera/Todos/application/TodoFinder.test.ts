import { TodoFinder } from '../../../../../src/Contexts/pecera/Todos/application/TodoFinder';
import {
  AuthError,
  NotFoundError
} from '../../../../../src/Contexts/shared/domain/errors';
import { UuidMother } from '../../../fixtures/shared/domain/mothers';
import { TodoRepositoryMock } from '../__mocks__/TodoRepositoryMock';
import { TodoFinderRequestMother } from './mothers/TodoFinderRequestMother';

describe('TodoFinder', () => {
  let repository: TodoRepositoryMock;
  let finder: TodoFinder;
  const USER_ID = UuidMother.random();
  const TODO_ID = UuidMother.random();

  beforeEach(() => {
    repository = new TodoRepositoryMock({ userId: USER_ID.value });
    finder = new TodoFinder(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find a todo', async () => {
    const request = TodoFinderRequestMother.create(TODO_ID, USER_ID);

    await finder.run(request);

    repository.assertSearchHasBeenCalledWith(TODO_ID.value);
  });

  it('should throw an error when the user is not the owner of the todo', async () => {
    const userId = UuidMother.random();
    const request = TodoFinderRequestMother.create(TODO_ID, userId);

    await expect(finder.run(request)).rejects.toThrow(AuthError);
  });

  it('should throw an error when the todo is not found', async () => {
    const request = TodoFinderRequestMother.inexistentId();

    await expect(finder.run(request)).rejects.toThrow(NotFoundError);
  });
});
