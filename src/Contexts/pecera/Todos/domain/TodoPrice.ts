import { InvalidArgumentError } from '../../../shared/domain/errors';
import { StringValueObject } from '../../../shared/domain/value-object';

export enum TodoPriceEnum {
  FREE = 'free',
  LOW = 'low',
  MEDIUM = 'medium',
  EXPENSIVE = 'expensive'
}

export class TodoPrice extends StringValueObject {
  readonly value: string;

  constructor(value: string) {
    super(value);
    this.ensureType(value);
    this.value = this.ensurePrice(value);
  }

  private ensurePrice(value: string): string {
    const _value = value.trim().toLowerCase();
    if (!Object.values(TodoPriceEnum).includes(value as TodoPriceEnum)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`
      );
    }

    return _value;
  }
}
