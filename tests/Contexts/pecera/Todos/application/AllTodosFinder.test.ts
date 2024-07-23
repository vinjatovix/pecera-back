import { AllTodosFinder } from '../../../../../src/Contexts/pecera/Todos/application';
import { UuidMother } from '../../../fixtures/shared/domain/mothers';
import { TodoRepositoryMock } from '../__mocks__/TodoRepositoryMock';

describe('AllTodosFinder', () => {
  let repository: TodoRepositoryMock;
  let finder: AllTodosFinder;
  const USER_ID = UuidMother.random();

  beforeEach(() => {
    repository = new TodoRepositoryMock({ userId: USER_ID.value });
    finder = new AllTodosFinder(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all todos from an user', async () => {
    await finder.run({ id: USER_ID.value });

    repository.assertFindByUserIdHasBeenCalledWith(USER_ID.value);
  });
});
