import { InvalidArgumentError } from '../../../shared/domain/errors';
import { StringValueObject } from '../../../shared/domain/value-object';

export class UserPassword extends StringValueObject {
  static readonly MIN_LENGTH = 8;
  static readonly MAX_LENGTH = 100;
  readonly value: string;

  constructor(value: string) {
    super(value);
    this.value = value;
  }

  static ensureLength(value: string): string {
    const _value = value.trim();

    if (_value.length < this.MIN_LENGTH || _value.length > this.MAX_LENGTH) {
      const message =
        _value.length < this.MIN_LENGTH
          ? `less than ${this.MIN_LENGTH}`
          : `more than ${this.MAX_LENGTH}`;
      throw new InvalidArgumentError(
        `<UserPassword> <${value}> has ${message} characters`
      );
    }

    return _value;
  }

  static ensureComplexity(value: string): string {
    const _value = value.trim();
    const errorMessages = [];

    const checks = [
      { regex: /[a-z]/, message: 'lower case characters' },
      { regex: /[A-Z]/, message: 'upper case characters' },
      { regex: /[0-9]/, message: 'numbers' },
      { regex: /[!@#$%^&*.]/, message: 'special characters' }
    ];

    for (const { regex, message } of checks) {
      if (!regex.test(_value)) {
        errorMessages.push(message);
      }
    }

    if (errorMessages.length > 0) {
      const errorPrefix = `<UserPassword> <${value}> does not contain `;
      throw new InvalidArgumentError(errorPrefix + errorMessages.join(', '));
    }

    return _value;
  }
}
