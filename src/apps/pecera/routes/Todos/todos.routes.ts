import { NextFunction, Request, Response, Router } from 'express';
import container from '../../dependency-injection';
import { validateReqSchema } from '../shared';
import { PostTodoController } from '../../controllers/Todos/PostTodoController';
import { GetTodoController } from '../../controllers/Todos/GetTodoController';
import { GetAllTodosController } from '../../controllers/Todos/GetAllTodosController';
import { DeleteTodoController } from '../../controllers/Todos/DeleteTodoController';
import {
  deleteReqSchema,
  getReqSchema,
  patchReqSchema,
  postReqSchema
} from './validationSchemas';
import { validateBody } from '../shared/validateBody';
import { PatchTodoController } from '../../controllers/Todos/PatchTodoController';
import { auth } from '../shared/auth';

const prefix = '/api/v1/Todos';

export const register = (router: Router) => {
  const postController: PostTodoController = container.get(
    'Apps.pecera.controllers.Todos.PostTodoController'
  );

  const getController: GetTodoController = container.get(
    'Apps.pecera.controllers.Todos.GetTodoController'
  );

  const getAllController: GetAllTodosController = container.get(
    'Apps.pecera.controllers.Todos.GetAllTodosController'
  );

  const patchController: PatchTodoController = container.get(
    'Apps.pecera.controllers.Todos.PatchTodoController'
  );

  const deleteController: DeleteTodoController = container.get(
    'Apps.pecera.controllers.Todos.DeleteTodoController'
  );

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

  router.get(
    `${prefix}/:id`,
    auth,
    getReqSchema,
    validateReqSchema,
    (req: Request, res: Response, next: NextFunction) => {
      getController.run(req, res, next);
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
