import { Request, Response } from 'express';
import { PatchTodoController } from '../../../../../src/apps/pecera/controllers/Todos';
import { TodoPatcher } from '../../../../../src/Contexts/pecera/Todos/application/TodoPatcher';
import { UuidMother } from '../../../../Contexts/fixtures/shared/domain/mothers';
import { TodoRepositoryMock } from '../../../../Contexts/pecera/Todos/__mocks__/TodoRepositoryMock';
import { TodoPatcherRequestMother } from '../../../../Contexts/pecera/Todos/application/mothers';

jest.mock(
  '../../../../../src/Contexts/pecera/Todos/application/TodoPatcher.ts'
);

describe('PatchTodoController', () => {
  let todoPatcher: TodoPatcher;
  let controller: PatchTodoController;
  let repository: TodoRepositoryMock;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let expectedTodo: TodoPatcherRequestMother;
  const USER_ID = UuidMother.random();
  const TODO_ID = UuidMother.random();

  beforeEach(() => {
    repository = new TodoRepositoryMock({ userId: USER_ID.value });
    todoPatcher = new TodoPatcher(repository);
    controller = new PatchTodoController(todoPatcher);
    expectedTodo = TodoPatcherRequestMother.random();
    req = {
      params: { id: TODO_ID.value },
      body: expectedTodo
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      locals: {
        user: { id: USER_ID.value }
      }
    };
    next = jest.fn();
  });

  describe('run', () => {
    it('should patch a todo and send 200 status', async () => {
      await controller.run(req as Request, res as Response, next);

      expect(todoPatcher.run).toHaveBeenCalledWith({
        id: TODO_ID.value,
        user: USER_ID.value,
        ...expectedTodo
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should call next with the error if todo patching fails', async () => {
      const error = new Error('Todo patching failed');
      jest.spyOn(todoPatcher, 'run').mockRejectedValueOnce(error);

      await controller.run(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
