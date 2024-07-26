import { MetadataType } from '../../../shared/application/MetadataType';
import { AggregateRoot } from '../../../shared/domain';
import { Metadata, Uuid } from '../../../shared/domain/value-object';
import { UserFriends } from '../../Auth/domain/UserFriends';
import { UsersGroupDescription } from './UsersGroupDescription';
import { UsersGroupName } from './UsersGroupName';

export class UsersGroup extends AggregateRoot {
  readonly id: Uuid;
  readonly name: UsersGroupName;
  readonly description: UsersGroupDescription;
  readonly editionUsers: UserFriends;
  readonly visualizationUsers: UserFriends;
  readonly metadata: Metadata;

  constructor({
    id,
    name,
    description,
    editionUsers,
    visualizationUsers,
    metadata
  }: {
    id: Uuid;
    name: UsersGroupName;
    description: UsersGroupDescription;
    editionUsers: UserFriends;
    visualizationUsers: UserFriends;
    metadata: Metadata;
  }) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.editionUsers = editionUsers;
    this.visualizationUsers = visualizationUsers;
    this.metadata = metadata;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      editionUsers: this.editionUsers.toPrimitives(),
      visualizationUsers: this.visualizationUsers.toPrimitives(),
      metadata: this.metadata.toPrimitives()
    };
  }

  static fromPrimitives({
    id,
    name,
    description,
    editionUsers,
    visualizationUsers,
    metadata
  }: {
    id: string;
    name: string;
    description: string;
    editionUsers: string[];
    visualizationUsers: string[];
    metadata: MetadataType;
  }) {
    return new UsersGroup({
      id: new Uuid(id),
      name: new UsersGroupName(name),
      description: new UsersGroupDescription(description),
      editionUsers: new UserFriends(editionUsers),
      visualizationUsers: new UserFriends(visualizationUsers),
      metadata: Metadata.fromPrimitives(metadata)
    });
  }
}
