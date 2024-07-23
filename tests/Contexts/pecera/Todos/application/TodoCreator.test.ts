import { TodoCreator } from '../../../../../src/Contexts/pecera/Todos/application/TodoCreator';
import { InvalidArgumentError } from '../../../../../src/Contexts/shared/domain/errors';
import { UserRepositoryMock } from '../../Auth/__mocks__/UserRepositoryMock';
import { CreateTodoRepositoryMock } from '../__mocks__/CreateTodoRepositoryMock';
import { TodoMother } from '../domain/TodoMother';
import { TodoCreatorRequestMother } from './mothers';

describe('TodoCreator', () => {
  let repository: CreateTodoRepositoryMock;
  let userRepository: UserRepositoryMock;
  let creator: TodoCreator;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new CreateTodoRepositoryMock();
    userRepository = new UserRepositoryMock({ exists: true });
    creator = new TodoCreator(repository, userRepository);
  });

  it('should create a valid todo', async () => {
    const request = TodoCreatorRequestMother.random();
    const todo = TodoMother.from(request);

    await creator.run(request);

    repository.assertSaveHasBeenCalledWith(todo);
  });

  it('should throw an error when the user does not exist', async () => {
    try {
      userRepository = new UserRepositoryMock({ exists: false });
      creator = new TodoCreator(repository, userRepository);
      const request = TodoCreatorRequestMother.random();

      await creator.run(request);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });

  it('should throw an error when the todo title is invalid', async () => {
    expect(() => {
      const request = TodoCreatorRequestMother.invalidValue(['title']);
      const todo = TodoMother.from(request);

      creator.run(request);

      repository.assertSaveHasBeenCalledWith(todo);
    }).toThrow(InvalidArgumentError);
  });

  it('should throw an error when the todo description is invalid', async () => {
    expect(() => {
      const request = TodoCreatorRequestMother.invalidValue(['description']);
      const todo = TodoMother.from(request);

      creator.run(request);

      repository.assertSaveHasBeenCalledWith(todo);
    }).toThrow(InvalidArgumentError);
  });

  it('should throw an error when the todo duration is not valid', async () => {
    expect(() => {
      const request = TodoCreatorRequestMother.invalidValue(['duration']);
      const todo = TodoMother.from(request);

      creator.run(request);

      repository.assertSaveHasBeenCalledWith(todo);
    }).toThrow(InvalidArgumentError);
  });

  it('should throw an error when the todo category is not valid', async () => {
    expect(() => {
      const request = TodoCreatorRequestMother.invalidValue(['category']);
      const todo = TodoMother.from(request);

      creator.run(request);

      repository.assertSaveHasBeenCalledWith(todo);
    }).toThrow(InvalidArgumentError);
  });

  it('should throw an error when the todo price is not valid', async () => {
    expect(() => {
      const request = TodoCreatorRequestMother.invalidValue(['price']);
      const todo = TodoMother.from(request);

      creator.run(request);

      repository.assertSaveHasBeenCalledWith(todo);
    }).toThrow(InvalidArgumentError);
  });

  it('should throw an error when the todo rank is not valid', async () => {
    expect(() => {
      const request = TodoCreatorRequestMother.invalidValue(['rank']);
      const todo = TodoMother.from(request);

      creator.run(request);

      repository.assertSaveHasBeenCalledWith(todo);
    }).toThrow(InvalidArgumentError);
  });

  it('should throw an error when the todo user is not valid', async () => {
    expect(() => {
      const request = TodoCreatorRequestMother.invalidValue(['user']);
      const todo = TodoMother.from(request);

      creator.run(request);

      repository.assertSaveHasBeenCalledWith(todo);
    }).toThrow(InvalidArgumentError);
  });
});
