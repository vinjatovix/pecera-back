import { UserPassword } from '../../../../../src/Contexts/pecera/Auth/domain';
import { UserPasswordMother } from './mothers';

describe('UserPassword', () => {
  it('should create a valid user password', () => {
    const password = UserPasswordMother.random();
    const userPassword = new UserPassword(password.value);

    expect(userPassword.value).toBe(password.value);
  });

  it(`should throw an error if user password is less than ${UserPassword.MIN_LENGTH} chars long`, () => {
    const invalidPassword = UserPasswordMother.invalidLength(true);

    expect(() => UserPassword.ensureLength(invalidPassword)).toThrow(
      `<UserPassword> <${invalidPassword}> has less than ${UserPassword.MIN_LENGTH} characters`
    );
  });

  it(`should throw an error if user password is more than ${UserPassword.MAX_LENGTH} chars long`, () => {
    const invalidPassword = UserPasswordMother.invalidLength();

    expect(() => UserPassword.ensureLength(invalidPassword)).toThrow(
      `<UserPassword> <${invalidPassword}> has more than ${UserPassword.MAX_LENGTH} characters`
    );
  });

  it('should throw an error if user password is not complex enough', () => {
    const invalidPassword = UserPasswordMother.invalidComplexity();

    expect(() => UserPassword.ensureComplexity(invalidPassword)).toThrow(
      `<UserPassword> <${invalidPassword}> does not contain upper case characters, numbers, special characters`
    );
  });
});
