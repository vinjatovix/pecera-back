import { Request, Response, Router, NextFunction } from 'express';
import { validateBody, validateReqSchema } from '../shared';
import { auth } from '../shared/auth';
import {
  DeleteUsersGroupsController,
  GetAllUsersGroupsByUserController,
  PatchUsersGroupsController,
  PostUsersGroupsController
} from '../../controllers/UsersGroups';
import container from '../../dependency-injection';
import {
  deleteReqSchema,
  patchReqSchema,
  postReqSchema
} from './validationSchemas';

const prefix = '/api/v1/UsersGroups';

const postController: PostUsersGroupsController = container.get(
  'Apps.pecera.controllers.UsersGroups.PostUsersGroupsController'
);

const patchController: PatchUsersGroupsController = container.get(
  'Apps.pecera.controllers.UsersGroups.PatchUsersGroupsController'
);

const getAllController: GetAllUsersGroupsByUserController = container.get(
  'Apps.pecera.controllers.UsersGroups.GetAllUsersGroupsByUserController'
);

const deleteController: DeleteUsersGroupsController = container.get(
  'Apps.pecera.controllers.UsersGroups.DeleteUsersGroupsController'
);

export const register = (router: Router) => {
  router.post(
    `${prefix}`,
    auth,
    validateBody,
    postReqSchema,
    validateReqSchema,
    (req: Request, res: Response, next: NextFunction) => {
      postController.run(req, res, next);
    }
  );

  router.patch(
    `${prefix}/:id`,
    auth,
    validateBody,
    patchReqSchema,
    validateReqSchema,
    (req: Request, res: Response, next: NextFunction) => {
      patchController.run(req, res, next);
    }
  );

  router.get(
    `${prefix}`,
    auth,
    (req: Request, res: Response, next: NextFunction) => {
      getAllController.run(req, res, next);
    }
  );

  router.delete(
    `${prefix}/:id`,
    auth,
    deleteReqSchema,
    validateReqSchema,
    (req: Request, res: Response, next: NextFunction) => {
      deleteController.run(req, res, next);
    }
  );
};
