import { InvalidArgumentError } from '../../../shared/domain/errors';
import { StringValueObject } from '../../../shared/domain/value-object';

export enum TodoDurationEnum {
  VERY_SHORT = 'very short',
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
  VERY_LONG = 'very long'
}

export class TodoDuration extends StringValueObject {
  readonly value: string;

  constructor(value: string) {
    super(value);
    this.ensureType(value);
    this.value = this.ensureDuration(value);
  }

  private ensureDuration(value: string): string {
    const _value = value.trim().toLowerCase();
    if (!Object.values(TodoDurationEnum).includes(value as TodoDurationEnum)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`
      );
    }

    return _value;
  }
}
