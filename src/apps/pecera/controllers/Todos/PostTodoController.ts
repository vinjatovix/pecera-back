import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { TodoCreator } from '../../../../Contexts/pecera/Todos/application/TodoCreator';
import { Controller } from '../../shared/interfaces/Controller';

export class PostTodoController implements Controller {
  constructor(protected todoCreator: TodoCreator) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = res.locals.user;
      const { id, title, category, description, duration, price, rank } =
        req.body;

      await this.todoCreator.run({
        id,
        title,
        category,
        description,
        duration,
        price,
        rank,
        user: userId
      });

      res.status(this.status()).send();
    } catch (error) {
      next(error);
    }
  }
  protected status() {
    return httpStatus.CREATED;
  }
}
