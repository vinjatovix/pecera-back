import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TodoRepositoryMock } from '../../../../Contexts/pecera/Todos/__mocks__/TodoRepositoryMock'; // Importa el TodoRepositoryMock
import { TodoFinder } from '../../../../../src/Contexts/pecera/Todos/application/TodoFinder';
import { GetTodoController } from '../../../../../src/apps/pecera/controllers/Todos/GetTodoController';
import { TodoMother } from '../../../../Contexts/pecera/Todos/domain/TodoMother';
import { Todo } from '../../../../../src/Contexts/pecera/Todos/domain/Todo';
import { UuidMother } from '../../../../Contexts/fixtures/shared/domain/mothers';

jest.mock('../../../../../src/Contexts/pecera/Todos/application/TodoFinder');

describe('GetTodoController', () => {
  let todoFinder: TodoFinder;
  let controller: GetTodoController;
  let repository: TodoRepositoryMock;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  const USER_ID = UuidMother.random();
  const TODO_ID = UuidMother.random();

  beforeEach(() => {
    repository = new TodoRepositoryMock({ userId: USER_ID.value });
    todoFinder = new TodoFinder(repository);
    controller = new GetTodoController(todoFinder);
    req = { params: { id: TODO_ID.value } };
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
    it('should get a todo and send 200 status', async () => {
      const todo: Todo = TodoMother.random();
      jest.spyOn(todoFinder, 'run').mockResolvedValueOnce(todo.toPrimitives());

      await controller.run(req as Request, res as Response, next);

      expect(todoFinder.run).toHaveBeenCalledWith({
        id: TODO_ID.value,
        user: USER_ID.value
      });
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(todo.toPrimitives());
    });

    it('should call next with the error if todo retrieval fails', async () => {
      const error = new Error('Todo retrieval failed');
      jest.spyOn(todoFinder, 'run').mockRejectedValueOnce(error);

      await controller.run(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
