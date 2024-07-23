import { Uuid } from '../../../../../../src/Contexts/shared/domain/value-object';

export class TodoFinderRequestMother {
  static create(id: Uuid, user: Uuid) {
    return {
      id: id.value,
      user: user.value
    };
  }

  static random() {
    return this.create(Uuid.random(), Uuid.random());
  }

  static inexistentId() {
    return {
      id: 'not-found',
      user: 'not-found'
    };
  }
}
