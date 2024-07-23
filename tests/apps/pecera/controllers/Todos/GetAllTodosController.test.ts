import httpStatus from 'http-status';
import { AllTodosFinder } from '../../../../../src/Contexts/pecera/Todos/application/AllTodosFinder';
import { Todo } from '../../../../../src/Contexts/pecera/Todos/domain/Todo';
import { TodoRepositoryMock } from '../../../../Contexts/pecera/Todos/__mocks__/TodoRepositoryMock';
import { TodoMother } from '../../../../Contexts/pecera/Todos/domain/TodoMother';
import { GetAllTodosController } from '../../../../../src/apps/pecera/controllers/Todos/GetAllTodosController';
import { Request, Response } from 'express';
import { UuidMother } from '../../../../Contexts/fixtures/shared/domain/mothers';

describe('GetAllTodosController', () => {
  let allTodosFinder: AllTodosFinder;
  let controller: GetAllTodosController;
  let repository: TodoRepositoryMock;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  const USER_ID = UuidMother.random();

  beforeEach(() => {
    repository = new TodoRepositoryMock({ userId: USER_ID.value });
    allTodosFinder = new AllTodosFinder(repository);
    controller = new GetAllTodosController(allTodosFinder);
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      locals: {
        user: {
          id: USER_ID.value
        }
      }
    };
    next = jest.fn();
  });

  describe('run', () => {
    it('should get all todos and send 200 status', async () => {
      const todos: Todo[] = TodoMother.randomList(3);
      jest
        .spyOn(allTodosFinder, 'run')
        .mockResolvedValueOnce(todos.map((todo) => todo.toPrimitives()));

      await controller.run(req as Request, res as Response, next);

      expect(allTodosFinder.run).toHaveBeenCalledWith({ id: USER_ID.value });
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(
        todos.map((todo) => todo.toPrimitives())
      );
    });
  });
});
