import { Uuid } from '../../../shared/domain/value-object';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { TodoCategory } from './TodoCategory';
import { TodoDescription } from './TodoDescription';
import { TodoDuration } from './TodoDuration';
import { TodoPrice } from './TodoPrice';
import { TodoRank } from './TodoRank';
import { TodoTitle } from './TodoTitle';

export class Todo extends AggregateRoot {
  readonly id: Uuid;
  readonly title: TodoTitle;
  readonly category: TodoCategory;
  readonly description: TodoDescription;
  readonly duration: TodoDuration;
  readonly price: TodoPrice;
  readonly rank: TodoRank;
  readonly user: Uuid;

  constructor({
    id,
    title,
    category,
    description,
    duration,
    price,
    rank,
    user
  }: {
    id: Uuid;
    title: TodoTitle;
    category: TodoCategory;
    description: TodoDescription;
    duration: TodoDuration;
    price: TodoPrice;
    rank: TodoRank;
    user: Uuid;
  }) {
    super();
    this.id = id;
    this.title = title;
    this.category = category;
    this.description = description;
    this.duration = duration;
    this.price = price;
    this.rank = rank;
    this.user = user;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      category: this.category.value,
      description: this.description.value,
      duration: this.duration.value,
      price: this.price.value,
      rank: this.rank.value,
      user: this.user.value
    };
  }

  static fromPrimitives({
    id,
    title,
    category,
    description,
    duration,
    price,
    rank,
    user
  }: {
    id: string;
    title: string;
    category: string;
    description: string;
    duration: string;
    price: string;
    rank: number;
    user: string;
  }) {
    return new Todo({
      id: new Uuid(id),
      title: new TodoTitle(title),
      category: new TodoCategory(category),
      description: new TodoDescription(description),
      duration: new TodoDuration(duration),
      price: new TodoPrice(price),
      rank: new TodoRank(rank),
      user: new Uuid(user)
    });
  }
}
