import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { TodoPatcher } from '../../../../Contexts/pecera/Todos/application/TodoPatcher';
import { Controller } from '../../shared/interfaces/Controller';

export class PatchTodoController implements Controller {
  constructor(protected bookPatcher: TodoPatcher) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { id: userId } = res.locals.user;
      const updates = req.body;

      await this.bookPatcher.run({
        id,
        user: userId,
        ...updates
      });

      res.status(this.status()).send();
    } catch (error: unknown) {
      next(error);
    }
  }

  protected status() {
    return httpStatus.OK;
  }
}
