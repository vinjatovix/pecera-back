import { StringValueObject } from '../../../shared/domain/value-object';

export class UsersGroupDescription extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
