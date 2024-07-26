import { NextFunction, Request, Response } from 'express';
import { UsersGroupsCreator } from '../../../../Contexts/pecera/UsersGroups/application';
import { Controller } from '../../shared/interfaces';
import httpStatus from 'http-status';

export class PostUsersGroupsController implements Controller {
  constructor(protected service: UsersGroupsCreator) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = res.locals.user;
      const { id, name, description, editionUsers, visualizationUsers } =
        req.body;

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
    return httpStatus.CREATED;
  }
}
