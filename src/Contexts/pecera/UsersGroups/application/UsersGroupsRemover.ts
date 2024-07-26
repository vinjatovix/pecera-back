import { AuthError } from '../../../shared/domain/errors';
import { buildLogger } from '../../../shared/plugins';
import { UsersGroupsRepository } from '../domain';
import { UsersGroupsRemoverRequest } from './interfaces';

const logger = buildLogger('UsersGroupsRemover');

export class UsersGroupsRemover {
  private repository: UsersGroupsRepository;

  constructor(repository: UsersGroupsRepository) {
    this.repository = repository;
  }

  async run(request: UsersGroupsRemoverRequest): Promise<void> {
    const storedGroup = await this.repository.findById(request.id);
    if (storedGroup === null) {
      return;
    }

    if (storedGroup.metadata.createdBy !== request.username) {
      throw new AuthError("You don't have permission to remove this resource");
    }

    await this.repository.remove(request.id);
    logger.info(`Group <${request.id}> removed by user <${request.userId}>`);
  }
}
