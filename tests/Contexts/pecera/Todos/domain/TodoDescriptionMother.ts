import { TodoDescription } from '../../../../../src/Contexts/pecera/Todos/domain';
import { random } from '../../../fixtures/shared';

export class TodoDescriptionMother {
  static readonly MIN_LENGTH = 1;
  static readonly MAX_LENGTH = 250;
  static create(value: string) {
    return new TodoDescription(value);
  }
  static random() {
    return this.create(
      random.word({
        min: TodoDescription.MIN_LENGTH,
        max: TodoDescription.MAX_LENGTH
      })
    );
  }

  static invalidValue() {
    return random.word({ min: TodoDescription.MAX_LENGTH + 1 });
  }
}
