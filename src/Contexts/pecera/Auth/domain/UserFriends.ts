import { Uuid } from '../../../shared/domain/value-object';

export class UserFriends {
  readonly value: Uuid[];

  constructor(value: string[]) {
    this.value = value.map((friend) => new Uuid(friend));
  }

  toPrimitives(): string[] {
    return this.value.map((friend) => friend.value);
  }
}
