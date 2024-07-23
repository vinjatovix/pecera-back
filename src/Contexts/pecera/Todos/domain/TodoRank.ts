import { InvalidArgumentError } from '../../../shared/domain/errors';

export enum TodoRankEnum {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

export class TodoRank {
  readonly value: number;

  constructor(value: number) {
    this.ensureType(value);
    this.ensureRank(value);

    this.value = value;
  }

  private ensureType(value: number): void {
    if (typeof value !== 'number') {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`
      );
    }
  }

  private ensureRank(value: number): void {
    if (!Object.values(TodoRankEnum).includes(value as TodoRankEnum)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`
      );
    }
  }
}
