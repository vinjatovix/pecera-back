import { AggregateRoot } from '../../../shared/domain';
import { Uuid } from '../../../shared/domain/value-object';
import { TodoCategory } from './TodoCategory';
import { TodoDescription } from './TodoDescription';
import { TodoDuration } from './TodoDuration';
import { TodoPrice } from './TodoPrice';
import { TodoRank } from './TodoRank';
import { TodoTitle } from './TodoTitle';

export class TodoPatch extends AggregateRoot {
  readonly id: Uuid;
  readonly title?: TodoTitle;
  readonly category?: TodoCategory;
  readonly description?: TodoDescription;
  readonly duration?: TodoDuration;
  readonly price?: TodoPrice;
  readonly rank?: TodoRank;

  constructor({
    id,
    title,
    category,
    description,
    duration,
    price,
    rank
  }: {
    id: Uuid;
    title?: TodoTitle;
    category?: TodoCategory;
    description?: TodoDescription;
    duration?: TodoDuration;
    price?: TodoPrice;
    rank?: TodoRank;
  }) {
    super();
    this.id = id;
    title && (this.title = title);
    category && (this.category = category);
    description && (this.description = description);
    duration && (this.duration = duration);
    price && (this.price = price);
    rank && (this.rank = rank);
  }

  toPrimitives() {
    return {
      id: this.id.value,
      ...(this.title?.value && { title: this.title.value }),
      ...(this.category?.value && { category: this.category.value }),
      ...(this.description?.value && { description: this.description.value }),
      ...(this.duration?.value && { duration: this.duration.value }),
      ...(this.price?.value && { price: this.price.value }),
      ...(this.rank?.value && { rank: this.rank.value })
    };
  }

  static fromPrimitives({
    id,
    title,
    category,
    description,
    duration,
    price,
    rank
  }: {
    id: string;
    title?: string;
    category?: string;
    description?: string;
    duration?: string;
    price?: string;
    rank?: number;
  }) {
    return new TodoPatch({
      id: new Uuid(id),
      ...(title && { title: new TodoTitle(title) }),
      ...(category && { category: new TodoCategory(category) }),
      ...(description && { description: new TodoDescription(description) }),
      ...(duration && { duration: new TodoDuration(duration) }),
      ...(price && { price: new TodoPrice(price) }),
      ...(rank && { rank: new TodoRank(rank) })
    });
  }
}
