import { ObjectId } from 'mongodb';
import { Nullable } from '../../../../shared/domain';
import { MongoRepository } from '../../../../shared/infrastructure/persistence/mongo/MongoRepository';
import { Todo, TodoPatch, TodoRepository } from '../../domain';

export interface TodoDocument {
  _id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  price: string;
  rank: number;
  user: string;
}

export class MongoTodoRepository
  extends MongoRepository<Todo | TodoPatch>
  implements TodoRepository {
  public async save(todo: Todo): Promise<void> {
    return this.persist(todo.id.value, todo);
  }

  public async remove(id: string): Promise<void> {
    return this.delete(id);
  }

  public async search(id: string): Promise<Nullable<Todo>> {
    const collection = await this.collection();
    const document = await collection.findOne<TodoDocument>({
      _id: id as unknown as ObjectId
    });

    return document
      ? Todo.fromPrimitives({
        id: document._id,
        title: document.title,
        description: document.description,
        category: document.category,
        duration: document.duration,
        price: document.price,
        rank: document.rank,
        user: document.user
      })
      : null;
  }

  public async findAll(): Promise<Todo[]> {
    const collection = await this.collection();
    const documents = await collection.find<TodoDocument>({}).toArray();

    return documents.map((document) =>
      Todo.fromPrimitives({
        id: document._id,
        title: document.title,
        description: document.description,
        category: document.category,
        duration: document.duration,
        price: document.price,
        rank: document.rank,
        user: document.user
      })
    );
  }

  public async findByUserId(userId: string): Promise<Todo[]> {
    const collection = await this.collection();
    const documents = await collection
      .find<TodoDocument>({ user: userId })
      .toArray();

    return documents.map((document) =>
      Todo.fromPrimitives({
        id: document._id,
        title: document.title,
        description: document.description,
        category: document.category,
        duration: document.duration,
        price: document.price,
        rank: document.rank,
        user: document.user
      })
    );
  }

  public async update(todo: TodoPatch): Promise<void> {
    return this.patch(todo);
  }

  protected collectionName(): string {
    return 'todos';
  }
}
