import { Request, Response } from 'express';
import { RefreshTokenController } from '../../../../../src/apps/pecera/controllers/Auth';
import { RefreshToken } from '../../../../../src/Contexts/pecera/Auth/application';
import { CryptAdapterMock } from '../../../../Contexts/pecera/Auth/__mocks__/CryptAdapterMock';
import { random } from '../../../../Contexts/fixtures/shared';
import httpStatus from 'http-status';
import { AuthError } from '../../../../../src/Contexts/shared/domain/errors';

describe('RefreshTokenController', () => {
  let encrypter: CryptAdapterMock;
  let controller: RefreshTokenController;
  let service: RefreshToken;
  const token = random.word();

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  const spyService = jest.spyOn(RefreshToken.prototype, 'run');

  beforeEach(() => {
    encrypter = new CryptAdapterMock({ token: true });
    service = new RefreshToken(encrypter);
    controller = new RefreshTokenController(service);
    req = { headers: { authorization: `Bearer ${token}` } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: { user: { username: random.word() } }
    };
    next = jest.fn();
  });

  describe('run', () => {
    it('should refresh the token', async () => {
      await controller.run(req as Request, res as Response, next);

      expect(spyService).toHaveBeenCalledWith({ token });
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    });

    it('should call next with the AuthError if no token provided', async () => {
      req = { headers: {} };
      await controller.run(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
    });

    it('should call next with the AuthError if token is invalid', async () => {
      encrypter = new CryptAdapterMock({ token: false });
      service = new RefreshToken(encrypter);
      controller = new RefreshTokenController(service);

      await controller.run(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
    });
  });
});
