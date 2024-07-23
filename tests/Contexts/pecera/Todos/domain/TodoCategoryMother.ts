import {
  TodoCategory,
  TodoCategoryEnum
} from '../../../../../src/Contexts/pecera/Todos/domain';
import { random } from '../../../fixtures/shared';

export class TodoCategoryMother {
  static create(value: string) {
    return new TodoCategory(value);
  }

  static random() {
    const posibleValues = Object.values(TodoCategoryEnum);

    return this.create(
      random.arrayElement(posibleValues)
    ) as unknown as TodoCategory;
  }

  static invalidValue(): unknown {
    return random.arrayElement([
      random.word({ min: 10 }),
      random.integer(),
      random.boolean()
    ]);
  }
}
