import { UserFriends } from '../../../../../src/Contexts/pecera/Auth/domain';
import { random } from '../../../fixtures/shared';

describe('UserFriends', () => {
  it('should throw an error if user friend is not a valid uuid', () => {
    const invalidFriend = random.word();
    expect(() => new UserFriends([invalidFriend])).toThrow(
      `<Uuid> does not allow the value <${invalidFriend}>`
    );
  });

  it('should create a valid user friends', () => {
    const userFriends = new UserFriends([random.uuid()]);
    expect(userFriends).toBeInstanceOf(UserFriends);
    expect(userFriends.value).toHaveLength(1);
  });
});
