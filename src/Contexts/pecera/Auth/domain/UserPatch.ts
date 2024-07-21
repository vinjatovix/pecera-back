import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';
import { Uuid } from '../../../shared/domain/value-object/Uuid';
import { UserFriends } from './UserFriends';
import { UserRoles } from './UserRoles';

type UserPatchProps = {
  id: Uuid;
  password?: StringValueObject;
  emailValidated?: boolean;
  roles?: UserRoles;
  friends?: UserFriends;
};

type UserPatchPrimitives = {
  id: string;
  password?: string;
  emailValidated?: boolean;
  roles?: string[];
  friends?: string[];
};

export class UserPatch extends AggregateRoot {
  readonly id: Uuid;
  readonly password?: StringValueObject;
  readonly emailValidated?: boolean;
  readonly roles?: UserRoles;
  readonly friends?: UserFriends;

  constructor({
    id,
    password,
    emailValidated,
    roles,
    friends
  }: UserPatchProps) {
    super();
    this.id = id;
    password && (this.password = password);
    emailValidated && (this.emailValidated = emailValidated);
    roles && (this.roles = roles);
    friends && (this.friends = friends);
  }

  toPrimitives(): UserPatchPrimitives {
    return {
      id: this.id.value,
      ...(this.password?.value && { password: this.password.value }),
      ...(this.emailValidated && { emailValidated: this.emailValidated }),
      ...(this.roles?.value && { roles: this.roles.value }),
      ...(this.friends && {
        friends: this.friends.toPrimitives()
      })
    };
  }

  static fromPrimitives({
    id,
    password,
    emailValidated,
    roles,
    friends
  }: UserPatchPrimitives) {
    return new UserPatch({
      id: new Uuid(id),
      ...(password && { password: new StringValueObject(password) }),
      ...(emailValidated && { emailValidated }),
      ...(roles && { roles: new UserRoles(roles) }),
      ...(friends && { friends: new UserFriends(friends) })
    });
  }
}
