import { TodoTitle } from '../../../../../src/Contexts/pecera/Todos/domain';
import { random } from '../../../fixtures/shared';

export class TodoTitleMother {
  static create(value: string) {
    return new TodoTitle(value);
  }

  static random(): TodoTitle {
    return this.create(
      random.word({ min: TodoTitle.MIN_LENGTH, max: TodoTitle.MAX_LENGTH })
    );
  }

  static invalidValue(): unknown {
    return random.arrayElement([
      random.word({ min: TodoTitle.MAX_LENGTH + 1 }),
      random.integer(),
      random.boolean()
    ]);
  }
}
