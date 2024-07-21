import { User } from '../../../../../src/Contexts/pecera/Auth/domain';
import { MetadataType } from '../../../../../src/Contexts/shared/application/MetadataType';
import { UserMother } from './mothers';

describe('User', () => {
  it('should create a valid user', () => {
    const user = UserMother.create();

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.username).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.emailValidated).toBeDefined();
    expect(user.roles).toBeDefined();
    expect(user.friends).toBeDefined();
  });

  it('should return primitives from user', () => {
    const user = UserMother.random();

    const primitives = user.toPrimitives();

    expect(primitives).toMatchObject({
      id: user.id.value,
      email: user.email.value,
      username: user.username.value,
      password: user.password.value,
      emailValidated: user.emailValidated,
      roles: user.roles.value,
      metadata: user.metadata.toPrimitives(),
      friends: user.friends.toPrimitives()
    });
  });

  it('should create a valid user from primitives', () => {
    const user = UserMother.random();

    const userFromPrimitives = User.fromPrimitives(
      user.toPrimitives() as {
        id: string;
        email: string;
        username: string;
        password: string;
        emailValidated: boolean;
        roles: string[];
        metadata: MetadataType;
        friends: string[];
      }
    );

    expect(userFromPrimitives).toBeInstanceOf(User);
    expect(userFromPrimitives).toEqual(user);
  });
});
