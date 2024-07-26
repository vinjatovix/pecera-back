import { AuthError, InvalidArgumentError } from '../../../shared/domain/errors';
import { buildLogger } from '../../../shared/plugins';
import { User, UserRepository } from '../../Auth/domain';
import { UsersGroup, UsersGroupPatch, UsersGroupsRepository } from '../domain';
import { UsersGroupsPatcherRequest } from './interfaces';

const logger = buildLogger('UsersGroupsPatcher');

export class UsersGroupsPatcher {
  private repository: UsersGroupsRepository;
  private userRepository: UserRepository;

  constructor(
    repository: UsersGroupsRepository,
    userRepository: UserRepository
  ) {
    this.repository = repository;
    this.userRepository = userRepository;
  }

  async run(request: UsersGroupsPatcherRequest): Promise<void> {
    const user = await this.getRequestUser(request.userId);
    const storedGroup = await this.getStoredUserGroup(request.id);
    await this.validateEditionPermissions(user, storedGroup);
    await this.validateUsers(request);
    const usersGroup = UsersGroupPatch.fromPrimitives(request);

    await this.repository.update(usersGroup, user.username);
    logger.info(`Group <${request.id}> patched by user <${request.userId}>`);
  }

  private async getRequestUser(id: string) {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      throw new InvalidArgumentError(`User <${id}> not found`);
    }
    return user;
  }

  private async getStoredUserGroup(id: string) {
    const storedGroup = await this.repository.findById(id);
    if (storedGroup === null) {
      throw new InvalidArgumentError(`Group with id <${id}> does not exist`);
    }
    return storedGroup;
  }

  private async validateEditionPermissions(
    user: User,
    storedGroup: UsersGroup
  ) {
    if (
      storedGroup.metadata.createdBy !== user.username.value &&
      !storedGroup.editionUsers.toPrimitives().includes(user.id.value)
    ) {
      throw new AuthError("You don't have permission to edit this resource");
    }
  }

  private async validateUsers(request: UsersGroupsPatcherRequest) {
    const { editionUsers = [], visualizationUsers = [] } = request;
    const allUsers = [...editionUsers, ...visualizationUsers];

    if (allUsers.length === 0) return;

    const usersToValidate =
      await this.userRepository.findNoValidatedUsersByIds(allUsers);

    if (usersToValidate.length > 0) {
      const usernames = usersToValidate
        .map((user) => user.username.value)
        .join(', ');
      throw new InvalidArgumentError(
        `Users <${usernames}> have not validated their emails`
      );
    }
  }
}
