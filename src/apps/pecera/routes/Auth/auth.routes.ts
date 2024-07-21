import { NextFunction, Request, Response, Router } from 'express';

import container from '../../dependency-injection';

import { validateBody, validateReqSchema } from '../shared';
import {
  LoginController,
  RegisterController,
  ValidateMailController
} from '../../controllers/Auth';
import {
  loginReqSchema,
  registerReqSchema,
  validateMailReqSchema
} from './validationSchemas';

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
};
