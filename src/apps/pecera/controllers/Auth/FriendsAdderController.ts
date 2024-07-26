import { NextFunction, Request, Response } from 'express';
import { FriendsAdder } from '../../../../Contexts/pecera/Auth/application';
import { Controller } from '../../shared/interfaces';
import httpStatus from 'http-status';

export class FriendsAdderController implements Controller {
  constructor(protected service: FriendsAdder) {}

  async run(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.id;
      const { friendIds } = req.body;

      await this.service.run({ userId, friendIds });

      res.status(this.status()).send();
    } catch (error) {
      next(error);
    }
  }

  protected status() {
    return httpStatus.OK;
  }
}
