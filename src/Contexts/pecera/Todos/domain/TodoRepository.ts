import { Todo } from './Todo';

export interface TodoRepository {
  save(todo: Todo): Promise<void>;

  search(id: string): Promise<Todo | null>;

  findAll(): Promise<Todo[]>;

  remove(id: string): Promise<void>;
}
