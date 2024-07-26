import { NextFunction, Request, Response } from 'express';
import { Controller } from '../../shared/interfaces';
import { UsersGroupsPatcher } from '../../../../Contexts/pecera/UsersGroups/application/UsersGroupsPatcher';
import httpStatus from 'http-status';

export class PatchUsersGroupsController implements Controller {
  constructor(protected service: UsersGroupsPatcher) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = res.locals.user;
      const { id } = req.params;
      const { name, description, editionUsers, visualizationUsers } = req.body;

      await this.service.run({
        id,
        name,
        description,
        editionUsers,
        visualizationUsers,
        userId
      });

      res.status(this.status()).send();
    } catch (error) {
      next(error);
    }
  }

  protected status() {
    return httpStatus.OK;
  }
}
