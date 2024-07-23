import { InvalidArgumentError } from '../../../shared/domain/errors';
import { StringValueObject } from '../../../shared/domain/value-object';

export enum TodoCategoryEnum {
  TRAVEL = 'travel',
  FOOD = 'food',
  SHOPPING = 'shopping',
  ENTERTAINMENT = 'entertainment',
  INTIMATE = 'intimate'
}

export class TodoCategory extends StringValueObject {
  readonly value: string;

  constructor(value: string) {
    super(value);
    this.ensureType(value);
    this.ensureCategory(value);

    this.value = value.trim();
  }

  private ensureCategory(value: string): void {
    if (!Object.values(TodoCategoryEnum).includes(value as TodoCategoryEnum)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`
      );
    }
  }
}
