import { NextFunction, Request, Response } from 'express';
import { AllTodosFinder } from '../../../../Contexts/pecera/Todos/application/AllTodosFinder';
import { Controller } from '../../shared/interfaces/Controller';
import httpStatus from 'http-status';

export class GetAllTodosController implements Controller {
  constructor(private allTodosFinder: AllTodosFinder) {}

  async run(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = res.locals.user;
      const todos = await this.allTodosFinder.run({ id: userId });

      res.status(httpStatus.OK).send(todos);
    } catch (error: unknown) {
      next(error);
    }
  }
}
