import { RequestById } from '../../../shared/application/RequestById';
import { TodoRepository } from '../domain/TodoRepository';
import { TodoResponse } from './interfaces';

export class AllTodosFinder {
  private readonly repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  async run(request: RequestById): Promise<TodoResponse[]> {
    const todos = await this.repository.findByUserId(request.id);

    return todos.map((todo) => ({
      id: todo.id.value,
      title: todo.title.value,
      category: todo.category.value,
      description: todo.description.value,
      duration: todo.duration.value,
      price: todo.price.value,
      rank: todo.rank.value,
      user: todo.user.value
    }));
  }
}
