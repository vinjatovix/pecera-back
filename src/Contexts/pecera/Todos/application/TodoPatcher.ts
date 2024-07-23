import { AuthError, NotFoundError } from '../../../shared/domain/errors';
import { buildLogger } from '../../../shared/plugins';
import { TodoPatch, TodoRepository } from '../domain';
import { TodoPatcherRequest } from './interfaces';

const logger = buildLogger('TodoPatcher');

export class TodoPatcher {
  private readonly repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  async run(request: TodoPatcherRequest): Promise<void> {
    const storedTodo = await this.repository.search(request.id);

    if (storedTodo === null) {
      throw new NotFoundError(`Todo <${request.id}> not found`);
    }

    if (storedTodo.user.value !== request.user) {
      throw new AuthError("You don't have permission to access this resource");
    }

    const todo = TodoPatch.fromPrimitives(request);

    await this.repository.update(todo);
    logger.info(`Todo <${request.id}> patched by user <${request.user}>`);
  }
}
