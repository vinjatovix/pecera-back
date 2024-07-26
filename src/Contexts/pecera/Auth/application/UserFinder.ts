import { Nullable } from '../../../shared/domain';
import { NotFoundError } from '../../../shared/domain/errors';
import { UserRepository } from '../domain';
import { UserResponse } from './interfaces';

export interface RequestByUsername {
  username: string;
  appRoles: string[];
}

export class UserFinder {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run({
    username,
    appRoles
  }: RequestByUsername): Promise<Nullable<Partial<UserResponse>>> {
    const storedUser = await this.repository.findByUsername(username);
    if (!storedUser) {
      throw new NotFoundError(`User <${username}> not found`);
    }

    return appRoles.includes('admin')
      ? {
          id: storedUser.id.value,
          email: storedUser.email.value,
          username: storedUser.username.value,
          emailValidated: storedUser.emailValidated,
          metadata: storedUser.metadata,
          friends: storedUser.friends.toPrimitives()
        }
      : {
          id: storedUser.id.value,
          emailValidated: storedUser.emailValidated
        };
  }
}
