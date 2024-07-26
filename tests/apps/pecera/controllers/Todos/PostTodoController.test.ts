import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TodoRepositoryMock } from '../../../../Contexts/pecera/Todos/__mocks__/TodoRepositoryMock'; // Importa el TodoRepositoryMock
import { TodoCreator } from '../../../../../src/Contexts/pecera/Todos/application/TodoCreator';
import { PostTodoController } from '../../../../../src/apps/pecera/controllers/Todos/PostTodoController';
import { TodoCreatorRequest } from '../../../../../src/Contexts/pecera/Todos/application/interfaces';
import { TodoCreatorRequestMother } from '../../../../Contexts/pecera/Todos/application/mothers';
import { UserRepositoryMock } from '../../../../Contexts/pecera/Auth/__mocks__/UserRepositoryMock';

jest.mock('../../../../../src/Contexts/pecera/Todos/application/TodoCreator');

describe('PostTodoController', () => {
  let todoCreator: TodoCreator;
  let controller: PostTodoController;
  let repository: TodoRepositoryMock;
  let userRepository: UserRepositoryMock;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let expectedTodo: TodoCreatorRequest;

  beforeEach(() => {
    expectedTodo = TodoCreatorRequestMother.random();
    repository = new TodoRepositoryMock({ userId: expectedTodo.user });
    userRepository = new UserRepositoryMock({ exists: true });
    todoCreator = new TodoCreator(repository, userRepository);
    controller = new PostTodoController(todoCreator);
    req = {
      body: expectedTodo
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      locals: {
        user: {
          id: expectedTodo.user
        }
      }
    };
    next = jest.fn();
  });

  describe('run', () => {
    it('should create a todo and send 201 status', async () => {
      await controller.run(req as Request, res as Response, next);

      expect(todoCreator.run).toHaveBeenCalledWith(expectedTodo);
      expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
      expect(res.send).toHaveBeenCalledWith();
    });

    it('should call next with the error if todo creation fails', async () => {
      const error = new Error('Todo creation failed');
      jest.spyOn(todoCreator, 'run').mockRejectedValueOnce(error);

      await controller.run(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
