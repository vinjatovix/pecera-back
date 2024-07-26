import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../shared/interfaces/Controller';
import { TodoRemover } from '../../../../Contexts/pecera/Todos/application/TodoRemover';
export class DeleteTodoController implements Controller {
  constructor(private TodoDeleter: TodoRemover) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { id: userId } = res.locals.user;
      await this.TodoDeleter.run({ id, user: userId });

      res.status(httpStatus.NO_CONTENT).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
