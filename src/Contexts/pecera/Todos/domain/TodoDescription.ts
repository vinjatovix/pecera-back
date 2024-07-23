import { StringValueObject } from '../../../shared/domain/value-object';

export class TodoDescription extends StringValueObject {
  static readonly MIN_LENGTH = 1;
  static readonly MAX_LENGTH = 250;
  readonly value: string;

  constructor(value: string) {
    super(value);
    this.ensureType(value);
    this.value = this.ensureLength(
      value,
      TodoDescription.MIN_LENGTH,
      TodoDescription.MAX_LENGTH
    );
  }
}
