import {
  TodoRank,
  TodoRankEnum
} from '../../../../../src/Contexts/pecera/Todos/domain';
import { random } from '../../../fixtures/shared';

export class TodoRankMother {
  static create(value: number) {
    return new TodoRank(value);
  }

  static random() {
    const posibleValues = Object.values(TodoRankEnum).filter(
      (value) => typeof value === 'number'
    ) as number[];

    return this.create(
      random.arrayElement(posibleValues)
    ) as unknown as TodoRank;
  }

  static invalidType(): unknown {
    return random.arrayElement([
      random.word(),
      Infinity,
      random.boolean(),
      NaN
    ]);
  }

  static invalidValue(): number {
    return random.integer({ min: -9999, max: -1 });
  }
}
