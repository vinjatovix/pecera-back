import { TodoRepository } from '../../../../../../src/Contexts/pecera/Todos/domain/TodoRepository';
import container from '../../../../../../src/apps/pecera/dependency-injection';
import { EnvironmentArranger } from '../../../../shared/infrastructure/arranger/EnvironmentArranger';
import { TodoMother } from '../../domain/TodoMother';

const repository: TodoRepository = container.get(
  'pecera.Todos.domain.TodoRepository'
);

const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'pecera.EnvironmentArranger'
);

describe('MongoTodoRepository', () => {
  beforeEach(async () => {
    await (await environmentArranger).arrange();
  });

  afterAll(async () => {
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
  });

  describe('save', () => {
    it('should save a todo', async () => {
      const todo = TodoMother.random();

      await repository.save(todo);
    });
  });

  describe('findByUserId', () => {
    it('should return an array of existing todos', async () => {
      const todo1 = TodoMother.random();
      await repository.save(todo1);

      const todo2 = TodoMother.random();
      await repository.save(todo2);

      expect(await repository.findByUserId(todo1.user.value)).toEqual([todo1]);

      expect(await repository.findByUserId(todo1.user.value)).not.toEqual(
        expect.arrayContaining([todo2])
      );
    });
  });

  describe('search', () => {
    it('should return an existing todo', async () => {
      const todo = TodoMother.random();

      await repository.save(todo);

      expect(await repository.search(todo.id.value)).toEqual(todo);
    });

    it('should not return a non existing todo', async () => {
      expect(await repository.search(TodoMother.random().id.value)).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return an array of existing todos', async () => {
      const todo1 = TodoMother.random();
      await repository.save(todo1);

      const todo2 = TodoMother.random();
      await repository.save(todo2);

      expect(await repository.findAll()).toEqual(
        expect.arrayContaining([todo1, todo2])
      );
    });
  });

  describe('remove', () => {
    it('should remove an existing todo', async () => {
      const todo = TodoMother.random();
      await repository.save(todo);

      await repository.remove(todo.id.value);

      expect(await repository.search(todo.id.value)).toBeNull();
    });
  });
});
