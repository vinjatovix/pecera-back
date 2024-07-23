import { Nullable } from '../../../shared/domain';
import { AuthError } from '../../../shared/domain/errors';
import { EncrypterTool } from '../../../shared/plugins';

export class RefreshToken {
  private readonly encrypter: EncrypterTool;

  constructor(encrypter: EncrypterTool) {
    this.encrypter = encrypter;
  }

  async run({ token }: { token: string }): Promise<Nullable<string>> {
    const newToken = await this.encrypter.refreshToken(token);
    if (!newToken) {
      throw new AuthError('Invalid token');
    }

    return newToken;
  }
}
