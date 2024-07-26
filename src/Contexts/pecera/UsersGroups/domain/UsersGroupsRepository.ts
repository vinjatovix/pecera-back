import { Nullable } from '../../../shared/domain';
import { Username } from '../../Auth/domain';
import { UsersGroup } from './UsersGroup';
import { UsersGroupPatch } from './UsersGroupPatch';

export interface UsersGroupsRepository {
  save(group: UsersGroup): Promise<void>;

  update(group: UsersGroupPatch, username: Username): Promise<void>;

  findById(id: string): Promise<Nullable<UsersGroup>>;

  findByUser(id: string, username: string): Promise<UsersGroup[]>;

  remove(id: string): Promise<void>;
}
