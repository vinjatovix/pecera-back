import { TodoRemover } from '../../../../../src/Contexts/pecera/Todos/application';
import { AuthError } from '../../../../../src/Contexts/shared/domain/errors';
import { UuidMother } from '../../../fixtures/shared/domain/mothers';
import { TodoRepositoryMock } from '../__mocks__/TodoRepositoryMock';
import { TodoFinderRequestMother } from './mothers/TodoFinderRequestMother';

describe('TodoRemover', () => {
  let repository: TodoRepositoryMock;
  let remover: TodoRemover;
  const USER_ID = UuidMother.random();
  const TODO_ID = UuidMother.random();

  beforeEach(() => {
    repository = new TodoRepositoryMock({ userId: USER_ID.value });
    remover = new TodoRemover(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove a todo', async () => {
    const request = TodoFinderRequestMother.create(TODO_ID, USER_ID);

    await remover.run(request);

    repository.assertRemoveHasBeenCalledWith(TODO_ID.value);
  });

  it('should throw an error when the user is not the owner of the todo', async () => {
    const userId = UuidMother.random();
    const request = TodoFinderRequestMother.create(TODO_ID, userId);

    await expect(remover.run(request)).rejects.toThrow(AuthError);
  });

  it('should not throw an error when the todo is not found', async () => {
    const request = TodoFinderRequestMother.inexistentId();

    await expect(remover.run(request)).resolves.toBeUndefined();
  });
});
