import {
  TodoPrice,
  TodoPriceEnum
} from '../../../../../src/Contexts/pecera/Todos/domain';
import { random } from '../../../fixtures/shared';

export class TodoPriceMother {
  static create(value: string) {
    return new TodoPrice(value);
  }

  static random() {
    const posibleValues = Object.values(TodoPriceEnum);

    return this.create(
      random.arrayElement(posibleValues)
    ) as unknown as TodoPrice;
  }

  static invalidValue(): unknown {
    return random.arrayElement([
      random.word({ min: 10 }),
      random.integer(),
      random.boolean()
    ]);
  }
}
