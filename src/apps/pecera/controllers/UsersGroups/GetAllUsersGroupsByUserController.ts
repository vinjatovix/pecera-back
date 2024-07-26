import httpStatus from 'http-status';
import { AllUsersGroupsFinder } from '../../../../Contexts/pecera/UsersGroups/application';
import { Controller } from '../../shared/interfaces';
import { NextFunction, Request, Response } from 'express';

export class GetAllUsersGroupsByUserController implements Controller {
  constructor(protected service: AllUsersGroupsFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, username } = res.locals.user;

      const usersGroups = await this.service.run({ id, username });

      res.status(this.status()).send(usersGroups);
    } catch (error) {
      next(error);
    }
  }

  protected status() {
    return httpStatus.OK;
  }
}
