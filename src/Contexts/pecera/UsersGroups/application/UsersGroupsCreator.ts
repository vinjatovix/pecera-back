import { InvalidArgumentError } from '../../../shared/domain/errors';
import { Metadata, Uuid } from '../../../shared/domain/value-object';
import { buildLogger } from '../../../shared/plugins';
import { UserRepository } from '../../Auth/domain';
import { UserFriends } from '../../Auth/domain/UserFriends';
import { UsersGroupsRepository, UsersGroup } from '../domain';
import { UsersGroupDescription } from '../domain/UsersGroupDescription';
import { UsersGroupName } from '../domain/UsersGroupName';
import { UsersGroupsCreatorRequest } from './interfaces';

const logger = buildLogger('UsersGroupsCreator');

export class UsersGroupsCreator {
  private repository: UsersGroupsRepository;
  private userRepository: UserRepository;

  constructor(
    repository: UsersGroupsRepository,
    userRepository: UserRepository
  ) {
    this.repository = repository;
    this.userRepository = userRepository;
  }

  async run(request: UsersGroupsCreatorRequest): Promise<void> {
    const user = await this.userRepository.findById(request.userId);

    if (user === null) {
      throw new InvalidArgumentError(`User <${request.userId}> not found`);
    }

    const storedGroup = await this.repository.findById(request.id);

    if (storedGroup !== null) {
      throw new InvalidArgumentError(
        `Group with id <${request.id}> already exists`
      );
    }

    const group = new UsersGroup({
      id: new Uuid(request.id),
      name: new UsersGroupName(request.name),
      description: new UsersGroupDescription(request.description),
      editionUsers: new UserFriends(request.editionUsers),
      visualizationUsers: new UserFriends(request.visualizationUsers),
      metadata: new Metadata({
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: user.username.value,
        updatedBy: user.username.value
      })
    });

    await this.repository.save(group);
    logger.info(`Group <${request.id}> created by user <${request.userId}>`);
  }
}
