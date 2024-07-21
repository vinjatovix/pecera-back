import { RegisterUserRequest } from '../../../../../../src/Contexts/pecera/Auth/application/interfaces';
import {
  User,
  UserPatch,
  UserPassword,
  UserRoles,
  Username
} from '../../../../../../src/Contexts/pecera/Auth/domain';
import {
  Email,
  Metadata,
  Uuid
} from '../../../../../../src/Contexts/shared/domain/value-object';
import { random } from '../../../../fixtures/shared';
import { EmailMother } from '../../../../fixtures/shared/domain/mothers';
import { UserPasswordMother } from './UserPasswordMother';
import { UserRolesMother } from './UserRolesMother';
import { UserFriends } from '../../../../../../src/Contexts/pecera/Auth/domain/UserFriends';

export class UserMother {
  static create({
    id,
    email,
    username,
    password,
    emailValidated,
    roles,
    metadata,
    friends
  }: {
    id?: Uuid;
    email?: Email;
    username?: Username;
    password?: UserPassword;
    emailValidated?: boolean;
    roles?: UserRoles;
    metadata?: Metadata;
    friends?: UserFriends;
  } = {}): User {
    const user =
      username ??
      new Username(
        random.word({ min: Username.MIN_LENGTH, max: Username.MAX_LENGTH })
      );
    return new User({
      id: id ?? Uuid.random(),
      email: email ?? EmailMother.random(),
      username: user,
      password: password ?? UserPasswordMother.random(),
      emailValidated: emailValidated ?? random.boolean(),
      roles:
        roles ??
        UserRolesMother.create([`${random.arrayElement(['admin', 'user'])}`]),
      metadata:
        metadata ??
        new Metadata({
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: user.value,
          updatedBy: user.value
        }),
      friends: friends ?? new UserFriends([Uuid.random().value])
    });
  }

  static from(command: RegisterUserRequest): User {
    return this.create({
      email: new Email(command.email),
      username: new Username(command.username),
      password: new UserPassword(command.password)
    });
  }

  static random(): User {
    return this.create();
  }

  static randomPatch(id: string): UserPatch {
    return new UserPatch({
      id: new Uuid(id),
      password: new UserPassword(random.word()),
      emailValidated: random.boolean(),
      roles: UserRolesMother.random()
    });
  }
}
