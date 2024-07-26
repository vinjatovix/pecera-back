import {
  InvalidArgumentError,
  NotFoundError
} from '../../../shared/domain/errors';
import { buildLogger } from '../../../shared/plugins';
import { UserPatch, UserRepository } from '../domain';
import { FriendsAdderRequest } from './interfaces';

const logger = buildLogger('friendsAdder');

export class FriendsAdder {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run({ userId, friendIds }: FriendsAdderRequest): Promise<void> {
    const storedUser = await this.repository.findById(userId);
    if (!storedUser) {
      throw new NotFoundError(`User <${userId}> not found`);
    }

    const friends = await this.repository.findUsersByIds(friendIds);
    const noValidatedFriends = friends.filter(
      (friend) => !friend.emailValidated
    );
    if (noValidatedFriends.length > 0) {
      throw new InvalidArgumentError(
        `Users <${noValidatedFriends.map((friend) => friend.username.value).join(', ')}> have not validated their emails`
      );
    }

    const userToPatch = UserPatch.fromPrimitives({
      id: storedUser.id.value,
      friends: friendIds
    });

    await this.repository.update(userToPatch, storedUser.username);
    logger.info(
      `User <${storedUser.id.value}> added friends <${friendIds.join(', ')}>`
    );
  }
}
