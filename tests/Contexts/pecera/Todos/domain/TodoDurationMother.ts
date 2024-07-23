import {
  TodoDuration,
  TodoDurationEnum
} from '../../../../../src/Contexts/pecera/Todos/domain';
import { random } from '../../../fixtures/shared';

export class TodoDurationMother {
  static create(value: string) {
    return new TodoDuration(value);
  }

  static random() {
    const posibleValues = Object.values(TodoDurationEnum);

    return this.create(
      random.arrayElement(posibleValues)
    ) as unknown as TodoDuration;
  }

  static invalidValue(): unknown {
    return random.arrayElement([
      random.word({ min: 10 }),
      random.integer(),
      random.boolean()
    ]);
  }
}
