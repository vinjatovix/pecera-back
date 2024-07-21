import { MetadataType } from '../../../shared/application/MetadataType';
import { AggregateRoot } from '../../../shared/domain';
import { Email, Metadata, Uuid } from '../../../shared/domain/value-object';

import { UserPassword } from './UserPassword';
import { UserRoles } from './UserRoles';
import { Username } from './Username';

export class User extends AggregateRoot {
  readonly id: Uuid;
  readonly email: Email;
  readonly username: Username;
  readonly password: UserPassword;
  readonly emailValidated: boolean;
  readonly roles: UserRoles;
  readonly metadata: Metadata;

  constructor({
    id,
    email,
    username,
    password,
    emailValidated,
    roles,
    metadata
  }: {
    id: Uuid;
    email: Email;
    username: Username;
    password: UserPassword;
    emailValidated: boolean;
    roles: UserRoles;
    metadata: Metadata;
  }) {
    super();
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.emailValidated = emailValidated;
    this.roles = roles;
    this.metadata = metadata;
  }

  toPrimitives(): Record<string, unknown> {
    return {
      id: this.id.value,
      email: this.email.value,
      username: this.username.value,
      password: this.password.value,
      emailValidated: this.emailValidated,
      roles: this.roles.value,
      metadata: this.metadata.toPrimitives()
    };
  }

  static fromPrimitives({
    id,
    email,
    username,
    password,
    emailValidated,
    roles,
    metadata
  }: {
    id: string;
    email: string;
    username: string;
    password: string;
    emailValidated: boolean;
    roles: string[];
    metadata: MetadataType;
  }): User {
    return new User({
      id: new Uuid(id),
      email: new Email(email),
      username: new Username(username),
      password: new UserPassword(password),
      emailValidated,
      roles: new UserRoles(roles),
      metadata: Metadata.fromPrimitives(metadata)
    });
  }
}
