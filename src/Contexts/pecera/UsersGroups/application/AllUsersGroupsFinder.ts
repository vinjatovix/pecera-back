import { UsersGroupsRepository } from '../domain';
import { UsersGroupResponse } from './interfaces';

export interface RequestByUsernameAndId {
  id: string;
  username: string;
}

export class AllUsersGroupsFinder {
  private repository: UsersGroupsRepository;

  constructor(repository: UsersGroupsRepository) {
    this.repository = repository;
  }

  async run(request: RequestByUsernameAndId): Promise<UsersGroupResponse[]> {
    const usersGroups = await this.repository.findByUser(
      request.id,
      request.username
    );

    return usersGroups.map((group) => ({
      id: group.id.value,
      name: group.name.value,
      description: group.description.value,
      editionUsers: group.editionUsers.toPrimitives(),
      visualizationUsers: group.visualizationUsers.toPrimitives(),
      metadata: group.metadata.toPrimitives()
    }));
  }
}
