import { NextFunction, Request, Response, Router } from 'express';

import container from '../../dependency-injection';

import { validateBody, validateReqSchema } from '../shared';
import {
  LoginController,
  RefreshTokenController,
  RegisterController,
  UserFinderController,
  ValidateMailController
} from '../../controllers/Auth';
import {
  loginReqSchema,
  registerReqSchema,
  validateMailReqSchema
} from './validationSchemas';
import { auth } from '../shared/auth';

const prefix = '/api/v1/Auth';

export const register = (router: Router) => {
  const loginController: LoginController = container.get(
    'Apps.pecera.controllers.Auth.LoginController'
  );

  const registerController: RegisterController = container.get(
    'Apps.pecera.controllers.Auth.RegisterController'
  );

  const validateMailController: ValidateMailController = container.get(
    'Apps.pecera.controllers.Auth.ValidateMailController'
  );

  const refreshTokenController: RefreshTokenController = container.get(
    'Apps.pecera.controllers.Auth.RefreshTokenController'
  );

  const userFinderController: UserFinderController = container.get(
    'Apps.pecera.controllers.Auth.UserFinderController'
  );

  router.post(
    `${prefix}/login`,
    validateBody,
    loginReqSchema,
    validateReqSchema,
    (req: Request, res: Response, next: NextFunction) => {
      loginController.run(req, res, next);
    }
  );

  router.post(
    `${prefix}/register`,
    validateBody,
    registerReqSchema,
    validateReqSchema,
    (req: Request, res: Response, next: NextFunction) => {
      registerController.run(req, res, next);
    }
  );

  router.get(
    `${prefix}/validate/:token`,
    validateMailReqSchema,
    validateReqSchema,
    (req: Request, res: Response, next: NextFunction) => {
      validateMailController.run(req, res, next);
    }
  );

  router.get(
    `${prefix}/refreshToken`,
    auth,
    (req: Request, res: Response, next: NextFunction) => {
      refreshTokenController.run(req, res, next);
    }
  );

  router.get(
    `${prefix}/user/:username`,
    auth,
    (req: Request, res: Response, next: NextFunction) => {
      userFinderController.run(req, res, next);
    }
  );
};
