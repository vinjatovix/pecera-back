import { InvalidArgumentError } from '../errors';

export class Email {
  private readonly emailRegex = /^[a-zA-Z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;
  private readonly minLength = 6;
  private readonly maxLength = 255;
  static readonly BLACKLIST_DOMAINS = [
    'mailinator.com',
    'guerrillamail.com',
    'sharklasers.com'
  ];
  readonly value: string;

  constructor(value: string) {
    this.value = this.ensureIsValidEmail(value);
  }

  private ensureLength(value: string): string {
    if (value.length < this.minLength) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> must be at least ${this.minLength} characters long`
      );
    }

    if (value.length > this.maxLength) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> must be less than ${this.maxLength} characters long`
      );
    }

    return value;
  }

  private ensureDomainsBlacklist(value: string): string {
    const domain = value.split('@')[1];
    if (Email.BLACKLIST_DOMAINS.includes(domain)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the domain <${value}>`
      );
    }
    return value;
  }

  private ensureIsEmailAddress(value: string): string {
    if (!this.emailRegex.test(value)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`
      );
    }
    return value;
  }

  private ensureIsValidEmail(value: string): string {
    const trimmedValue = value.trim();
    this.ensureLength(trimmedValue);
    this.ensureIsEmailAddress(trimmedValue);
    this.ensureDomainsBlacklist(trimmedValue);

    return trimmedValue;
  }
}