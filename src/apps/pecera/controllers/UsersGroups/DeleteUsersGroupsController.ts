import { NextFunction, Request, Response } from 'express';
import { Controller } from '../../shared/interfaces';
import { UsersGroupsRemover } from '../../../../Contexts/pecera/UsersGroups/application';

export class DeleteUsersGroupsController implements Controller {
  constructor(private readonly service: UsersGroupsRemover) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { username, id: userId } = res.locals.user;

      await this.service.run({ id, username, userId });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
