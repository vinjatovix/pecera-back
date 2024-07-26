import { InvalidArgumentError } from '../../../shared/domain/errors';
import { Uuid } from '../../../shared/domain/value-object';
import { buildLogger } from '../../../shared/plugins';
import { UserRepository } from '../../Auth/domain';
import {
  TodoRepository,
  Todo,
  TodoTitle,
  TodoCategory,
  TodoDescription,
  TodoDuration,
  TodoPrice,
  TodoRank
} from '../domain';
import { TodoCreatorRequest } from './interfaces';

const logger = buildLogger('TodoCreator');

export class TodoCreator {
  private repository: TodoRepository;
  private userRepository: UserRepository;

  constructor(repository: TodoRepository, userRepository: UserRepository) {
    this.repository = repository;
    this.userRepository = userRepository;
  }

  async run(request: TodoCreatorRequest): Promise<void> {
    const user = await this.userRepository.findById(request.user);

    if (user === null) {
      throw new InvalidArgumentError(`User <${request.user}> not found`);
    }

    const storedTodo = await this.repository.search(request.id);

    if (storedTodo !== null) {
      throw new InvalidArgumentError(
        `Todo with id <${request.id}> already exists`
      );
    }

    const todo = new Todo({
      id: new Uuid(request.id),
      title: new TodoTitle(request.title),
      category: new TodoCategory(request.category),
      description: new TodoDescription(request.description),
      duration: new TodoDuration(request.duration),
      price: new TodoPrice(request.price),
      rank: new TodoRank(request.rank),
      user: new Uuid(request.user)
    });

    await this.repository.save(todo);
    logger.info(`Todo <${request.id}> created by user <${request.user}>`);
  }
}
