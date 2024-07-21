import { InvalidArgumentError } from '../../../shared/domain/errors';
import { Email, Metadata, Uuid } from '../../../shared/domain/value-object';
import { buildLogger, EncrypterTool } from '../../../shared/plugins';
import {
  User,
  Username,
  UserPassword,
  UserRepository,
  UserRoles
} from '../domain';
import { RegisterUserRequest } from './interfaces';

const logger = buildLogger('registerUser');

export class RegisterUser {
  private readonly repository: UserRepository;
  private readonly encrypter: EncrypterTool;

  constructor(repository: UserRepository, encrypter: EncrypterTool) {
    this.repository = repository;
    this.encrypter = encrypter;
  }

  async run({ password, username, email }: RegisterUserRequest): Promise<void> {
    const storedUser = await this.repository.search(email);
    if (storedUser) {
      throw new InvalidArgumentError(`User <${email}> already exists`);
    }

    UserPassword.ensureLength(password);
    const encryptedPassword = this.encrypter.hash(
      UserPassword.ensureComplexity(password)
    );

    const user = new User({
      id: Uuid.random(),
      email: new Email(email),
      username: new Username(username),
      password: new UserPassword(encryptedPassword),
      emailValidated: false,
      roles: new UserRoles(['user']),
      metadata: new Metadata({
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: username,
        updatedBy: username
      })
    });

    await this.repository.save(user);
    logger.info(`User <${user.username.value}> registered`);
  }
}
