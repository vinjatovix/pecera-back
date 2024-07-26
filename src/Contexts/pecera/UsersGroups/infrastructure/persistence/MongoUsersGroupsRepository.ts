import { MetadataType } from '../../../../shared/application/MetadataType';
import { MongoRepository } from '../../../../shared/infrastructure/persistence/mongo/MongoRepository';
import { UsersGroup, UsersGroupPatch } from '../../domain';
import { UsersGroupsRepository } from '../../domain/UsersGroupsRepository';
import { Nullable } from '../../../../shared/domain/Nullable';
import { ObjectId } from 'mongodb';
import { Username } from '../../../Auth/domain';

export interface GroupDocument {
  _id: string;
  name: string;
  description: string;
  editionUsers: string[];
  visualizationUsers: string[];
  metadata: MetadataType;
}

export class MongoUsersGroupsRepository
  extends MongoRepository<UsersGroup | UsersGroupPatch>
  implements UsersGroupsRepository
{
  public async save(group: UsersGroup): Promise<void> {
    return this.persist(group.id.value, group);
  }

  public async update(
    group: UsersGroupPatch,
    username: Username
  ): Promise<void> {
    return this.patch(group, username);
  }

  public async findById(id: string): Promise<Nullable<UsersGroup>> {
    const collection = await this.collection();
    const document = await collection.findOne<GroupDocument>({
      _id: id as unknown as ObjectId
    });

    return document ? this.fromPrimitives(document) : null;
  }

  public async findByUser(id: string, username: string): Promise<UsersGroup[]> {
    const collection = await this.collection();
    const documents = await collection
      .find<GroupDocument>({
        $or: [
          { editionUsers: id },
          { visualizationUsers: id },
          { metadata: { createdBy: username } }
        ]
      })
      .toArray();

    return documents.map(this.fromPrimitives);
  }

  public async remove(id: string): Promise<void> {
    return this.delete(id);
  }

  private fromPrimitives(document: GroupDocument): UsersGroup {
    return UsersGroup.fromPrimitives({
      id: document._id,
      name: document.name,
      description: document.description,
      editionUsers: document.editionUsers,
      visualizationUsers: document.visualizationUsers,
      metadata: document.metadata
    });
  }

  protected collectionName(): string {
    return 'usersGroups';
  }
}
