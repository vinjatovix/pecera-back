import { Email } from '../../../../../src/Contexts/shared/domain/value-object';
import { random } from '../../../fixtures/shared';

export class EmailMother {
  static create(value: string) {
    return new Email(value);
  }

  static random() {
    return this.create(random.email());
  }
}
