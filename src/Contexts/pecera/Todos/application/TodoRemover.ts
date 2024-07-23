import { AuthError } from '../../../shared/domain/errors';
import { buildLogger } from '../../../shared/plugins';
import { TodoRepository } from '../domain/TodoRepository';
import { TodoRequestByIdAndUser } from './interfaces/TodoRequestByIdAndUser';

const logger = buildLogger('TodoRemover');

export class TodoRemover {
  private readonly repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  async run(request: TodoRequestByIdAndUser): Promise<void> {
    const todo = await this.repository.search(request.id);

    if (todo === null) {
      return;
    }

    if (todo.user.value !== request.user) {
      throw new AuthError("You don't have permission to access this resource");
    }

    await this.repository.remove(request.id);
    logger.info(`Todo <${request.id}> removed by user <${request.user}>`);
  }
}
