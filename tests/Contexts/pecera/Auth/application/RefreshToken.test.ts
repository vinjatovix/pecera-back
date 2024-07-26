import { RefreshToken } from '../../../../../src/Contexts/pecera/Auth/application';
import { random } from '../../../fixtures/shared';
import { CryptAdapterMock } from '../__mocks__/CryptAdapterMock';

describe('RefreshToken', () => {
  let encrypter: CryptAdapterMock;
  let service: RefreshToken;

  beforeEach(() => {
    encrypter = new CryptAdapterMock({ token: true });
    service = new RefreshToken(encrypter);
  });

  it('should refresh the token', async () => {
    const token = random.word({ min: 6, max: 255 });

    await service.run({ token });

    encrypter.assertRefreshTokenHasBeenCalledWith(token);
  });

  it('should throw an error if the token is invalid', async () => {
    encrypter = new CryptAdapterMock({ token: false });
    service = new RefreshToken(encrypter);
    const token = random.word({ min: 6, max: 255 });

    await expect(service.run({ token })).rejects.toThrow('Invalid token');
  });
});
