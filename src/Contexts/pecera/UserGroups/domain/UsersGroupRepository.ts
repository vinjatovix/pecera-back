import { UsersGroup, UsersGroupPatch } from '../../UsersGroups/domain/';

export interface UsersGroupRepository {
  save(group: UsersGroup): Promise<void>;

  update(group: UsersGroupPatch): Promise<void>;

  search(id: string): Promise<UsersGroup | null>;

  remove(id: string): Promise<void>;
}
