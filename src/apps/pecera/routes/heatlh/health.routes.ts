import { Request, Response, Router } from 'express';

import container from '../../dependency-injection';
import { GetStatusController } from '../../controllers/health/GetStatusController';

const prefix = '/api/v1/health';

export const register = (router: Router) => {
  const controller: GetStatusController = container.get(
    'Apps.pecera.controllers.health.GetStatusController'
  );
  router.get(`${prefix}/http`, (req: Request, res: Response) => {
    controller.run(req, res);
  });
};
