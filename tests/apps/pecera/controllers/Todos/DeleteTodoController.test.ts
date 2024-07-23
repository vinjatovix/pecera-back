import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TodoRemover } from '../../../../../src/Contexts/pecera/Todos/application/TodoRemover';
import { DeleteTodoController } from '../../../../../src/apps/pecera/controllers/Todos/DeleteTodoController';
import { TodoRepository } from '../../../../../src/Contexts/pecera/Todos/domain/TodoRepository';
import { TodoRepositoryMock } from '../../../../Contexts/pecera/Todos/__mocks__/TodoRepositoryMock';
import { UuidMother } from '../../../../Contexts/fixtures/shared/domain/mothers';

jest.mock('../../../../../src/Contexts/pecera/Todos/application/TodoRemover');

describe('DeleteTodoController', () => {
  let todoRemover: TodoRemover;
  let controller: DeleteTodoController;
  let repository: TodoRepositoryMock;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  const USER_ID = UuidMother.random();
  const TODO_ID = UuidMother.random();

  beforeEach(() => {
    repository = new TodoRepositoryMock({ userId: USER_ID.value });
    todoRemover = new TodoRemover(repository as unknown as TodoRepository);
    controller = new DeleteTodoController(todoRemover);
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
    it('should delete a todo and send 204 status', async () => {
      await controller.run(req as Request, res as Response, next);

      expect(todoRemover.run).toHaveBeenCalledWith({
        id: TODO_ID.value,
        user: USER_ID.value
      });
      expect(res.status).toHaveBeenCalledWith(httpStatus.NO_CONTENT);
      expect(res.send).toHaveBeenCalledWith();
    });

    it('should call next with the error if deletion fails', async () => {
      const error = new Error('Deletion failed');
      jest.spyOn(todoRemover, 'run').mockRejectedValueOnce(error);

      await controller.run(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
