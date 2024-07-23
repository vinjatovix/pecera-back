import { UserPassword } from '../../../../../../src/Contexts/pecera/Auth/domain';
import { random } from '../../../../fixtures/shared';

const SPECIAL_CHARACTERS = '!@#$%^&*.'.split('');
const MIN_LENGTH = UserPassword.MIN_LENGTH;
const MAX_LENGTH = UserPassword.MAX_LENGTH;

export class UserPasswordMother {
  static create(value: string): UserPassword {
    return new UserPassword(value);
  }
  static random() {
    const specialCharacter = random.arrayElement(SPECIAL_CHARACTERS);
    const upperCase = random
      .word({ min: MIN_LENGTH * 0.5, max: MAX_LENGTH * 0.5 - 1 })
      .toUpperCase();
    const lowerCase = random
      .word({ min: MIN_LENGTH * 0.5, max: MAX_LENGTH * 0.5 - 1 })
      .toLowerCase();
    const number = random.integer({ min: 0, max: 9 });

    const password = `${specialCharacter}${upperCase}${lowerCase}${number}`;

    return this.create(password);
  }
  static invalidLength(short: boolean = false): string {
    return short
      ? random.word({ min: 1, max: UserPassword.MIN_LENGTH - 1 })
      : random.word({ min: UserPassword.MAX_LENGTH + 1 });
  }

  static invalidComplexity(): string {
    return random.word({ min: MIN_LENGTH, max: MAX_LENGTH });
  }
}
