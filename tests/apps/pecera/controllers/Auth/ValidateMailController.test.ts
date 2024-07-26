import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ValidateMailController } from '../../../../../src/apps/pecera/controllers/Auth';
import { ValidateMail } from '../../../../../src/Contexts/pecera/Auth/application';
import { AuthError } from '../../../../../src/Contexts/shared/domain/errors';
import { CryptAdapterMock } from '../../../../Contexts/pecera/Auth/__mocks__/CryptAdapterMock';
import { UserRepositoryMock } from '../../../../Contexts/pecera/Auth/__mocks__/UserRepositoryMock';

describe('ValidateMailController', () => {
  let repository: UserRepositoryMock;
  let encrypter: CryptAdapterMock;
  let controller: ValidateMailController;
  let service: ValidateMail;
  let request: { token: string };

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  const spyService = jest.spyOn(ValidateMail.prototype, 'run');

  beforeEach(() => {
    repository = new UserRepositoryMock({ exists: true });
    encrypter = new CryptAdapterMock({ login: true, token: true });
    service = new ValidateMail(repository, encrypter);
    controller = new ValidateMailController(service);
    request = { token: 'token' };
    req = { params: request };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  describe('run', () => {
    it('should validate the mail and send 200 status', async () => {
      await controller.run(req as Request, res as Response, next);

      expect(spyService).toHaveBeenCalledWith(request);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) });
    });

    it('should call next with the AuthError if login fails', async () => {
      encrypter = new CryptAdapterMock({ login: false });
      service = new ValidateMail(repository, encrypter);
      controller = new ValidateMailController(service);

      await controller.run(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
    });
  });
});
