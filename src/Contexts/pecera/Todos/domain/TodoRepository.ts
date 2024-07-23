import { Todo } from './Todo';
import { TodoPatch } from './TodoPatch';

export interface TodoRepository {
  save(todo: Todo): Promise<void>;

  update(todo: TodoPatch): Promise<void>;

  search(id: string): Promise<Todo | null>;

  findByUserId(userId: string): Promise<Todo[]>;

  findAll(): Promise<Todo[]>;

  remove(id: string): Promise<void>;
}
