import {
  TodoRepository,
  Todo,
  TodoPatch
} from '../../../../../src/Contexts/pecera/Todos/domain';

export class CreateTodoRepositoryMock implements TodoRepository {
  private saveMock: jest.Mock;
  private findMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
    this.findMock = jest.fn();
  }

  async save(todo: Todo): Promise<void> {
    this.saveMock(todo);
  }

  assertSaveHasBeenCalledWith(expected: Todo): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  async search(id: string): Promise<Todo | null> {
    this.findMock = jest.fn().mockReturnValue(null);

    return this.findMock(id);
  }

  assertSearchHasBeenCalledWith(expected: string): void {
    expect(this.findMock).toHaveBeenCalledWith(expected);
  }

  findAll(): Promise<Todo[]> {
    throw new Error('Method not implemented.');
  }
  async update(_book: TodoPatch): Promise<void> {
    return;
  }
  remove(_todoId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByUserId(_userId: string): Promise<Todo[]> {
    throw new Error('Method not implemented.');
  }
}
