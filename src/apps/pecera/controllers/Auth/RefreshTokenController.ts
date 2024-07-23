import { NextFunction, Request, Response } from 'express';
import { RefreshToken } from '../../../../Contexts/pecera/Auth/application';
import { Controller } from '../../shared/interfaces';
import httpStatus from 'http-status';
import { AuthError } from '../../../../Contexts/shared/domain/errors';
import { buildLogger } from '../../../../Contexts/shared/plugins';

const logger = buildLogger('RefreshTokenController');

export class RefreshTokenController implements Controller {
  constructor(private readonly refreshToken: RefreshToken) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new AuthError('No token provided');
      }

      const token = authorization.replace('Bearer ', '');
      const newToken = await this.refreshToken.run({ token });
      const { username } = res.locals.user;

      logger.info(`Token refreshed by ${username}`);
      res.status(this.status()).json({ token: newToken });
    } catch (error) {
      next(error);
    }
  }

  protected status() {
    return httpStatus.OK;
  }
}
