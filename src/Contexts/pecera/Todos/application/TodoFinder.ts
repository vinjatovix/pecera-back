import { AuthError, NotFoundError } from '../../../shared/domain/errors';
import { TodoRepository } from '../domain';
import { TodoRequestByIdAndUser } from './interfaces/TodoRequestByIdAndUser';
import { TodoResponse } from './interfaces/TodoResponse';

export class TodoFinder {
  private readonly repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  async run(request: TodoRequestByIdAndUser): Promise<TodoResponse> {
    const todo = await this.repository.search(request.id);

    if (todo === null) {
      throw new NotFoundError(`Todo <${request.id}> not found`);
    }

    if (todo.user.value !== request.user) {
      throw new AuthError("You don't have permission to access this resource");
    }

    return {
      id: todo.id.value,
      title: todo.title.value,
      category: todo.category.value,
      description: todo.description.value,
      duration: todo.duration.value,
      price: todo.price.value,
      rank: todo.rank.value,
      user: todo.user.value
    };
  }
}
