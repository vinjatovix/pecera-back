import { AggregateRoot } from '../../../shared/domain';
import { Uuid } from '../../../shared/domain/value-object';
import { UserFriends } from '../../Auth/domain/UserFriends';
import { UsersGroupDescription } from './UsersGroupDescription';
import { UsersGroupName } from './UsersGroupName';

export class UsersGroupPatch extends AggregateRoot {
  readonly id: Uuid;
  readonly name?: UsersGroupName;
  readonly description?: UsersGroupDescription;
  readonly editionUsers?: UserFriends;
  readonly visualizationUsers?: UserFriends;

  constructor({
    id,
    name,
    description,
    editionUsers,
    visualizationUsers
  }: {
    id: Uuid;
    name?: UsersGroupName;
    description?: UsersGroupDescription;
    editionUsers?: UserFriends;
    visualizationUsers?: UserFriends;
  }) {
    super();
    this.id = id;
    name && (this.name = name);
    description && (this.description = description);
    editionUsers && (this.editionUsers = editionUsers);
    visualizationUsers && (this.visualizationUsers = visualizationUsers);
  }

  toPrimitives(): Record<string, unknown> {
    return {
      id: this.id.value,
      ...(this.name && { name: this.name.value }),
      ...(this.description && { description: this.description.value }),
      ...(this.editionUsers && {
        editionUsers: this.editionUsers.toPrimitives()
      }),
      ...(this.visualizationUsers && {
        visualizationUsers: this.visualizationUsers.toPrimitives()
      })
    };
  }

  static fromPrimitives({
    id,
    name,
    description,
    editionUsers,
    visualizationUsers
  }: {
    id: string;
    name?: string;
    description?: string;
    editionUsers?: string[];
    visualizationUsers?: string[];
  }): UsersGroupPatch {
    return new UsersGroupPatch({
      id: new Uuid(id),
      ...(name && { name: new UsersGroupName(name) }),
      ...(description && {
        description: new UsersGroupDescription(description)
      }),
      ...(editionUsers && { editionUsers: new UserFriends(editionUsers) }),
      ...(visualizationUsers && {
        visualizationUsers: new UserFriends(visualizationUsers)
      })
    });
  }
}
