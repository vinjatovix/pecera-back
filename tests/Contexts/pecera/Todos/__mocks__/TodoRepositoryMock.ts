import { Todo } from '../../../../../src/Contexts/pecera/Todos/domain/Todo';
import { TodoRepository } from '../../../../../src/Contexts/pecera/Todos/domain/TodoRepository';
import { Uuid } from '../../../../../src/Contexts/shared/domain/value-object';
import { TodoMother } from '../domain/TodoMother';

export class TodoRepositoryMock implements TodoRepository {
  private saveMock: jest.Mock;
  private findMock: jest.Mock;
  private findAllMock: jest.Mock;
  private findByUserIdMock: jest.Mock;
  private removeMock: jest.Mock;
  private userId: string;

  constructor({ userId }: { userId: string }) {
    this.saveMock = jest.fn();
    this.findMock = jest.fn();
    this.findAllMock = jest.fn();
    this.findByUserIdMock = jest.fn();
    this.removeMock = jest.fn();
    this.userId = userId;
  }

  async save(todo: Todo): Promise<void> {
    this.saveMock(todo);
  }

  assertSaveHasBeenCalledWith(expected: Todo): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  async search(id: string): Promise<Todo | null> {
    this.findMock = jest.fn().mockImplementation((id: string) => {
      if (id === 'not-found') {
        return null;
      }

      return this.userId
        ? TodoMother.create({
            id: new Uuid(id),
            user: new Uuid(this.userId)
          })
        : TodoMother.random();
    });

    return this.findMock(id);
  }

  assertSearchHasBeenCalledWith(expected: string): void {
    expect(this.findMock).toHaveBeenCalledWith(expected);
  }

  async findByUserId(userId: string): Promise<Todo[]> {
    this.findByUserIdMock = jest.fn().mockReturnValue([
      TodoMother.create({
        user: new Uuid(userId)
      })
    ]);

    return this.findByUserIdMock(userId);
  }

  assertFindByUserIdHasBeenCalledWith(expected: string): void {
    expect(this.findByUserIdMock).toHaveBeenCalledWith(expected);
  }

  async findAll(): Promise<Todo[]> {
    const todoList = TodoMother.randomList(3);
    this.findAllMock = jest.fn().mockReturnValue(todoList);

    return this.findAllMock();
  }

  assertSearchAllHasBeenCalled(): void {
    expect(this.findAllMock).toHaveBeenCalled();
  }

  async remove(id: string): Promise<void> {
    this.removeMock(id);
  }

  assertRemoveHasBeenCalledWith(expected: string): void {
    expect(this.removeMock).toHaveBeenCalledWith(expected);
  }
}
