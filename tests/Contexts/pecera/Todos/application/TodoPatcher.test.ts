import { TodoPatcher } from '../../../../../src/Contexts/pecera/Todos/application/TodoPatcher';
import { TodoPatch } from '../../../../../src/Contexts/pecera/Todos/domain';
import {
  AuthError,
  NotFoundError
} from '../../../../../src/Contexts/shared/domain/errors';
import { UuidMother } from '../../../fixtures/shared/domain/mothers';
import { TodoRepositoryMock } from '../__mocks__/TodoRepositoryMock';
import { TodoPatcherRequestMother } from './mothers';
import { TodoFinderRequestMother } from './mothers/TodoFinderRequestMother';

describe('TodoPatcher', () => {
  let repository: TodoRepositoryMock;
  let patcher: TodoPatcher;
  const USER_ID = UuidMother.random();

  beforeEach(() => {
    repository = new TodoRepositoryMock({ userId: USER_ID.value });
    patcher = new TodoPatcher(repository);
  });

  it('should patch a valid todo', async () => {
    const request = TodoPatcherRequestMother.create({ user: USER_ID });
    const todo = TodoPatch.fromPrimitives(request);

    await patcher.run(request);

    repository.assertUpdateHasBeenCalledWith(todo);
  });

  it('should throw an error when the user is not the owner of the todo', async () => {
    const userId = UuidMother.random();
    const request = TodoPatcherRequestMother.create({ user: userId });

    await expect(patcher.run(request)).rejects.toThrow(AuthError);
  });

  it('should throw an error when the todo is not found', async () => {
    const request = TodoFinderRequestMother.inexistentId();

    await expect(patcher.run(request)).rejects.toThrow(NotFoundError);
  });
});
