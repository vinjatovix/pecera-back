import { TodoCreatorRequest } from '../../../../../src/Contexts/pecera/Todos/application/interfaces';
import {
  TodoTitle,
  TodoCategory,
  TodoDescription,
  TodoDuration,
  TodoPrice,
  TodoRank,
  Todo
} from '../../../../../src/Contexts/pecera/Todos/domain';
import { Uuid } from '../../../../../src/Contexts/shared/domain/value-object';
import { UuidMother } from '../../../fixtures/shared/domain/mothers';
import { TodoCategoryMother } from './TodoCategoryMother';
import { TodoDescriptionMother } from './TodoDescriptionMother';
import { TodoDurationMother } from './TodoDurationMother';
import { TodoPriceMother } from './TodoPriceMother';
import { TodoRankMother } from './TodoRankMother';
import { TodoTitleMother } from './TodoTitleMother';

export class TodoMother {
  static create(
    id: Uuid,
    title: TodoTitle,
    category: TodoCategory,
    description: TodoDescription,
    duration: TodoDuration,
    price: TodoPrice,
    rank: TodoRank,
    user: Uuid
  ) {
    return new Todo({
      id,
      title,
      category,
      description,
      duration,
      price,
      rank,
      user
    });
  }

  static from(command: TodoCreatorRequest): Todo {
    return this.create(
      UuidMother.create(command.id),
      TodoTitleMother.create(command.title),
      TodoCategoryMother.create(command.category),
      TodoDescriptionMother.create(command.description),
      TodoDurationMother.create(command.duration),
      TodoPriceMother.create(command.price),
      TodoRankMother.create(command.rank),
      UuidMother.create(command.user)
    );
  }

  static random(): Todo {
    return this.create(
      UuidMother.random(),
      TodoTitleMother.random(),
      TodoCategoryMother.random(),
      TodoDescriptionMother.random(),
      TodoDurationMother.random(),
      TodoPriceMother.random(),
      TodoRankMother.random(),
      UuidMother.random()
    );
  }
}
