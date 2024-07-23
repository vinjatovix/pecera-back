import { StringValueObject } from '../../../shared/domain/value-object';

export class TodoTitle extends StringValueObject {
  static readonly MIN_LENGTH = 1;
  static readonly MAX_LENGTH = 100;
  readonly value: string;

  constructor(value: string) {
    super(value);
    this.ensureType(value);
    this.value = this.ensureLength(
      value,
      TodoTitle.MIN_LENGTH,
      TodoTitle.MAX_LENGTH
    );
  }
}
