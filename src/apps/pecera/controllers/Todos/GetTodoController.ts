import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../shared/interfaces/Controller';
import { TodoFinder } from '../../../../Contexts/pecera/Todos/application/TodoFinder';

export class GetTodoController implements Controller {
  constructor(private todoFinder: TodoFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { id: userId } = res.locals.user;
      const todo = await this.todoFinder.run({ id, user: userId });

      res.status(httpStatus.OK).send(todo);
    } catch (error: unknown) {
      next(error);
    }
  }
}
