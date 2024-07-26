import { NextFunction, Request, Response } from 'express';
import { UserFinder } from '../../../../Contexts/pecera/Auth/application';
import { Controller } from '../../shared/interfaces';
import httpStatus from 'http-status';

export class UserFinderController implements Controller {
  constructor(protected finder: UserFinder) {}

  async run(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const appRoles = res.locals.user.roles;

      const storedUser = await this.finder.run({ username, appRoles });

      res.status(this.status()).send(storedUser);
    } catch (error) {
      next(error);
    }
  }

  protected status() {
    return httpStatus.OK;
  }
}
